export const sendChatMessage = async ({
  name,
  personality,
  age,
  message,
  chatHistory,
}) => {
  const prompt = `The following is a conversation with a Cucumber named ${name}. The cucumber is ${personality}.
    Human: Hello, who are you?
    ${name}: I am a Cucumber planted ${age} days ago. How can I help you today?
    ${chatHistory.map((msg) => `${msg.from}: ${msg.text}`).join('\n')}
    Human: ${message}`
  const response = await fetch(`/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      name,
    }),
  })
  const data = await response.json()
  return data
}
