import { useCallback, useState } from 'react'
import { queryOpenRouter } from '../services/openrouter'

export const useOpenRouterAI = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const queryAI = useCallback(
    async (message, stream = false) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await queryOpenRouter(
          [
            {
              role: 'system',
              content: 'You are BecondMP, a helpful AI code assistant. Provide concise, practical answers. No judgment, just solutions.',
            },
            {
              role: 'user',
              content: message,
            },
          ],
          'meta-llama/llama-2-70b-chat',
          stream
        )

        setIsLoading(false)
        return response
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
        return `Error: ${err.message}`
      }
    },
    []
  )

  return { queryAI, isLoading, error }
}

export default useOpenRouterAI