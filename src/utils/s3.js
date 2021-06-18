const AWS = require('aws-sdk')
const fs = require('fs')
const config = require('../config/aws_config')
const s3 = new AWS.S3(config.aws_remote_config)
const AWS_BUCKET = config.AWS_BUCKET

const uploadToS3 = (id, fileName) => {
  const fileContent = fs.readFileSync(fileName)
  const Key = `${id}\\${fileName}`

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

const deleteFromS3 = (id, fileName) => {
  const Key = `${id}\\${fileName}`
  const params = {
    Bucket: AWS_BUCKET,
    Key: Key,
  }
  return s3.deleteObject(params)
    .promise()
    .then(() => Key)
    .catch((err) => {
      console.log(err)
      throw err
    })
}

module.exports = {
  uploadToS3,
  deleteFromS3,
}
