import { IPullRequest } from '@renderer/interfaces/IPullRequest'
import { MODELS_PULL } from './constants'
import { IProgressResponse } from '@renderer/interfaces/IProgressResponse'

export const pullModel = async (
  request: IPullRequest,
  onProgress: (response: IProgressResponse) => void
): Promise<void> => {
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

    let totalLength = 0
    let prvTotalLength = 0
    let prvReceivedLength = 0
    let receivedLength = 0
    let messageObject: IProgressResponse = {} as IProgressResponse
    let error: unknown | null
    const reader = response.body.getReader()

    let result = await reader.read()
    let shouldStop = false

    while (!result.done && !shouldStop) {
      const resMsg = new TextDecoder().decode(result.value)
      try {
        const msg = JSON.parse(resMsg) as IProgressResponse

        if ('error' in msg) {
          error = { message: resMsg.error || 'Failed to pull model' }
          shouldStop = true
          break
        }

        messageObject = msg
        if (typeof msg.total === 'number' && !isNaN(msg.total)) {
          // console.log('Total length ', msg.total)
          if (totalLength !== msg.total) {
            totalLength = +msg.total
            if (totalLength !== prvTotalLength) {
              prvTotalLength += totalLength
              prvReceivedLength += receivedLength
            }
            // console.log('Total length ', msg.total, totalLength, prvTotalLength)
          }
        }

        if (typeof msg.completed === 'number' && !isNaN(msg.completed)) {
          receivedLength = msg.completed
          // console.log('Received', receivedLength, ' / ', prvReceivedLength, ' / ', prvTotalLength)
        }
      } catch (e) {
        console.log(e)
        prvReceivedLength += receivedLength
      }

      const progress: IProgressResponse = {
        status:
          typeof error === 'object' && error !== null && 'message' in error
            ? (error as { message: string }).message
            : resMsg.indexOf('success') >= 0
              ? 'success'
              : `Downloading model ${request.model}...`,
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
