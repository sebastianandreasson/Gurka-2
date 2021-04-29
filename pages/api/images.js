import * as aws from '../../aws'

export default async function handler(req, res) {
  const { type } = req.query
  const images = await aws.getImages(type)
  const time = 60 * 20
  res.setHeader('Cache-Control', `max-age=0, s-maxage=${time}`)
  res.status(200).json(images)
}
