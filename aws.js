import aws from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

aws.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.MY_AWS_REGION,
  signatureVersion: 'v4',
})

const db = new aws.DynamoDB.DocumentClient({ apiVersion: 'latest' })

export const createImage = async (url, imageType) => {
  try {
    await db
      .put({
        TableName: 'Images',
        Item: {
          id: uuidv4(),
          url,
          imageType,
          date: moment().format(),
        },
      })
      .promise()
  } catch (e) {
    console.log(e)
  }
}

export const getImages = async (type) => {
  try {
    const result = await db
      .scan({
        TableName: 'Images',
        FilterExpression: 'imageType = :imageType',
        ExpressionAttributeValues: {
          ':imageType': type,
        },
        ScanIndexForward: false,
      })
      .promise()
    return result.Items.sort((a, b) => new Date(a.date) - new Date(b.date))
  } catch (e) {
    console.log(e)
  }
}

export const getUploadUrl = (file) => {
  const s3 = new aws.S3()
  const url = s3.getSignedUrl('putObject', {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file,
    ACL: 'public-read',
    Expires: 120,
    ContentType: 'application/octet-stream',
  })
  return url
}

export const getGurkor = async () => {
  try {
    const result = await db
      .scan({
        TableName: 'Gurkor',
      })
      .promise()
    return result.Items
  } catch (e) {
    console.log(e)
  }
}
