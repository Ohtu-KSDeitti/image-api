const { TABLENAME, docClient } = require('../config/dynamodb_config')
const { deleteFromS3 } = require('../utils/s3')

const getUserImages = (id, client = docClient) => {
  const params = {
    TableName: TABLENAME,
    Key: {
      'id': id,
    },
  }

  return client
    .get(params)
    .promise()
    .then((data) => {
      if (!data.Item) {
        const item = {
          id: id,
          profilePic: 'none',
          albumPics: [],
        }
        return item
      }

      return data.Item
    })
}

const updateUserImages = (id, userImages, client = docClient) => {
  const params = {
    TableName: TABLENAME,
    Key: {
      'id': id,
    },
    UpdateExpression: `set #profilePic = :profilePic,
    #albumPics = :albumPics`,
    ExpressionAttributeNames:
    {
      '#profilePic': 'profilePic',
      '#albumPics': 'albumPics',
    },
    ExpressionAttributeValues:
    {
      ':profilePic': userImages.profilePic,
      ':albumPics': userImages.albumPics,
    },
  }

  return client
    .update(params)
    .promise()
    .then(() => userImages)
}

const updateProfilePic = async (id, profilePic) => {
  const userImages = await getUserImages(id)

  const updatedUserImage = { ...userImages, profilePic }

  return await updateUserImages(id, updatedUserImage)
}

const removeProfilePic = async (id) => {
  const userImages = await getUserImages(id)
  const updatedUserImage = { ...userImages, profilePic: 'none' }

  await deleteFromS3(id, userImages.profilePic)

  return await updateUserImages(id, updatedUserImage)
}
const removeAlbumPic = async (id, albumPicName) => {
  const userImages = await getUserImages(id)
  const albumPics = userImages.albumPics.filter((pic) => pic !== albumPicName)

  await deleteFromS3(id, albumPicName)

  const updateUserImages = {
    ...userImages,
    albumPics,
  }

  return updateUserImages(id, userImages)
}
const addAlbumPic = async (id, albumPicName) => {
  const userImages = await getUserImages(id)
  const albumPics = userImages.albumPics.concat(albumPicName)

  const updateUserImages = {
    ...userImages,
    albumPics,
  }

  return await updateUserImages(id, updateUserImages)
}

module.exports = {
  getUserImages,
  updateProfilePic,
  removeProfilePic,
  removeAlbumPic,
  addAlbumPic,
}
