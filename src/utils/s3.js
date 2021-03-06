const AWS = require('aws-sdk')
const fs = require('fs')
const config = require('../config/aws_config')
const s3 = new AWS.S3(config.aws_remote_config)
const AWS_BUCKET = config.AWS_BUCKET

const uploadToS3 = (id, filename) => {
  const fileContent = fs.readFileSync(filename)
  const Key = `${id}/${filename}`

  const params = {
    Bucket: AWS_BUCKET,
    Key: Key,
    Body: fileContent,
  }

  return s3.upload(params)
    .promise()
    .then(() => Key)
    .catch((err) => {
      throw err
    })
}

const deleteFromS3 = (id, filename) => {
  const Key = `${id}/${filename}`
  const params = {
    Bucket: AWS_BUCKET,
    Key: Key,
  }
  return s3.deleteObject(params)
    .promise()
    .then(() => Key)
    .catch((err) => {
      throw err
    })
}

const getPresignedPostS3 = (id, filename) => {
  const Key = `${id}/${filename}`
  const params = {
    Bucket: AWS_BUCKET,
    Fields: {
      Key,
    },
    Expires: 300,
    Conditions: [
      ['content-length-range', 0, 524288],
    ],
  }

  return s3.createPresignedPost(params)
}

module.exports = {
  uploadToS3,
  deleteFromS3,
  getPresignedPostS3,
}
