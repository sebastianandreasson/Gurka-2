import moment from 'moment'
import * as aws from '../../aws'

export default async function handler(req, res) {
  const s3Url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`
  const { file, type } = req.query
  const url = aws.getUploadUrl(file)
  await aws.createImage(`${s3Url}/${file}`, type)

  res.status(200).json({
    url,
  })
}
