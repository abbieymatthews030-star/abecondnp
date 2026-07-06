import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://openrouter.ai/api/v1'

const openRouterClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
    'X-Title': 'BecondMP',
  },
})

export const queryOpenRouter = async (messages, model = 'meta-llama/llama-2-70b-chat', stream = false) => {
  try {
    const response = await openRouterClient.post('/chat/completions', {
      model,
      messages,
      stream,
      temperature: 0.7,
      top_p: 0.9,
    })

    if (stream) {
      return response.data
    } else {
      return response.data.choices[0].message.content
    }
  } catch (error) {
    console.error('OpenRouter API Error:', error)
    throw new Error(`AI Service Error: ${error.response?.data?.error?.message || error.message}`)
  }
}

export default openRouterClient