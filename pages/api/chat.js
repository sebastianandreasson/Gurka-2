import axios from 'axios'

export default async function handler(req, res) {
  const { name, prompt } = req.body
  const response = await axios.post(
    `https://api.openai.com/v1/engines/curie/completions`,
    {
      prompt,
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ['Human:'],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  )
  const choices = response.data.choices

  const answer = choices.find((choice) => !!choice.text)

  if (answer) {
    const startIndex = answer.text.indexOf(`${name}:`) + `${name}:`.length
    const text = answer.text.substring(startIndex, answer.text.length)
    return res.status(200).json({ text: text.substring(0, text.indexOf('\n')) })
  }

  res
    .status(200)
    .json({ text: `${name} is sleepy and doesn\'t feel like talking.` })
}
