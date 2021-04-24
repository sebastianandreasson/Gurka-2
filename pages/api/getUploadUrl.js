import aws from 'aws-sdk'

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_BUCKET_REGION,
    signatureVersion: 'v4',
  })

  const s3 = new aws.S3()
  const post = await s3.createPresignedPost({
    Bucket: process.env.AWS_BUCKET_NAME,
    Fields: {
      key: req.query.file,
      acl: 'public-read',
    },
    Expires: 60,
    Conditions: [
      ['content-length-range', 0, 1048576], // up to 1 MB
    ],
  })
  console.log('return url')

  res.status(200).json(post)
}
