import aws from 'aws-sdk'
import moment from 'moment'
import { gql, GraphQLClient } from 'graphql-request'

const query = gql`
  mutation($data: ImageInput!) {
    createImage(data: $data) {
      _id
      url
      taken
      type
    }
  }
`

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_BUCKET_REGION,
    signatureVersion: 'v4',
  })
  const s3Url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com`
  const token = process.env.NEXT_PUBLIC_FAUNADB_SECRET
  const client = new GraphQLClient('https://graphql.fauna.com/graphql', {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })
  const { file, type } = req.query

  const s3 = new aws.S3()
  const url = s3.getSignedUrl('putObject', {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file,
    ACL: 'public-read',
    Expires: 120,
    ContentType: 'application/octet-stream',
  })
  await client.request(query, {
    data: {
      url: `${s3Url}/${file}`,
      taken: file.replace('.jpg', ''),
      type,
    },
  })

  res.status(200).json({
    url,
  })
}
