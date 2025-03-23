import { GENERATE } from './constants'

export const unloadModel = async (model: string): void => {
  const response = await fetch(GENERATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model, stream: false, 'keep-alive': 0 })
  })
  await response.json()
}
