import * as aws from '../../aws'

export default async function handler(req, res) {
  const gurkor = await aws.getGurkor()
  res.status(200).json(gurkor)
}
