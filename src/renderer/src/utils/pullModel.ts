import { IPullRequest } from '@renderer/interfaces/IPullRequest'
import { MODELS_PULL } from './constants'
import { IProgressResponse } from '@renderer/interfaces/IProgressResponse'

export const pullModel = async (
  request: IPullRequest,
  onProgress: (response: IProgressResponse) => void
): void => {
  const host = MODELS_PULL
  if (request.stream) {
    const abortController = new AbortController()
    const response = await fetch(host, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request),
      signal: abortController.signal
    })

    if (!response.body) {
      throw new Error('Missing body')
    }

    let totalLength = 0
    let prvTotalLength = 0
    let prvReceivedLength = 0
    let receivedLength = 0
    const reader = response.body.getReader()

    let result = await reader.read()
    while (result.done === false) {
      const resMsg = new TextDecoder().decode(result.value)
      try {
        const msg = JSON.parse(resMsg)
        if (!isNaN(msg.total)) {
          // console.log('Total length ', msg.total)
          if (totalLength === msg.total) {
            console.log('Total length is the same')
          } else {
            totalLength = +msg.total
            if (totalLength !== prvTotalLength) {
              prvTotalLength += totalLength
              prvReceivedLength += receivedLength
            }
            // console.log('Total length ', msg.total, totalLength, prvTotalLength)
          }
        }
        if (!isNaN(msg.completed)) {
          receivedLength = msg.completed
          // console.log('Received', receivedLength, ' / ', prvReceivedLength, ' / ', prvTotalLength)
        }
      } catch (e) {
        console.log(e)
        prvReceivedLength += receivedLength
      }

      const progress: IProgressResponse = {
        status: 'Pulling model...',
        total: totalLength >= prvTotalLength ? totalLength : prvTotalLength,
        completed: receivedLength >= prvReceivedLength ? receivedLength : prvReceivedLength
      }
      onProgress(progress)

      result = await reader.read()
    }
  } else {
    throw new Error('Streaming is not enabled in the request')
  }
}
