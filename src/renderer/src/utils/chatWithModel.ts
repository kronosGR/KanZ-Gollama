import { IChatRequest } from '@renderer/interfaces/IChatRequest'
import { IChatResponse } from '@renderer/interfaces/IChatResponse'
import { CHAT, GENERATE } from './constants'
import { IMessage } from '@renderer/interfaces/IMessage'
import { useChatStore } from '@renderer/stores/useChatStore'

export const chatWithModel = async (
  request: IChatRequest,
  aIType: string,
  onProgress: (response: IChatResponse) => void,
  signal: AbortSignal
): Promise<void | { message: string }> => {
  const host = aIType === 'generate' ? GENERATE : CHAT

  if (request.stream) {
    let resMsg = ''
    try {
      const response = await fetch(host, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request),
        signal: signal
      })

      const reader = response.body?.getReader()
      let result = await reader?.read()

      let progress: IChatResponse
      let message: IMessage
      let shouldStop = false
      let error = ''

      while (!result.done && !shouldStop) {
        resMsg = new TextDecoder().decode(result?.value)
        const msg = JSON.parse(resMsg) as IChatResponse

        if ('error' in msg) {
          error = resMsg.error || 'Failed to chat'
          shouldStop = true
          // console.error('error: ', error)
        }

        message = {
          role: 'assistant', // msg.message.role
          content: aIType === 'chat' ? msg.message.content : msg.response
        }
        progress = {
          model: msg.model,
          message: message,
          done: msg.done,
          created_at: msg.created_at
        }

        if (msg.done) {
          progress = {
            model: msg?.model,
            message: message,
            done: msg?.done,
            created_at: msg?.created_at,
            total_duration: msg?.total_duration,
            load_duration: msg?.load_duration,
            prompt_eval_count: msg?.prompt_eval_count,
            prompt_eval_duration: msg?.prompt_eval_duration,
            eval_count: msg?.eval_count,
            eval_duration: msg?.eval_duration
          }
        }

        onProgress(progress)

        result = await reader?.read()
      }
    } catch (e) {
      if ((e as DOMException).name === 'AbortError') {
        return { message: 'Answer aborted' }
      } else {
        return { message: 'Issues with the model' }
      }
    }
  }
}
