import { IChatRequest } from '@renderer/interfaces/IChatRequest'
import { IChatResponse } from '@renderer/interfaces/IChatResponse'
import { CHAT } from './constants'
import { IMessage } from '@renderer/interfaces/IMessage'

export const chatWithModel = async (
  request: IChatRequest,
  onProgress: (response: IChatResponse) => void,
  signal: AbortSignal
): Promise<void> => {
  const host = CHAT

  if (request.stream) {
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

      while (!result.done) {
        const resMsg = new TextDecoder().decode(result?.value)
        const msg = JSON.parse(resMsg) as IChatResponse

        // console.log(msg.message.content, msg.done)

        message = { role: msg.message.role, content: msg.message.content }
        progress = {
          model: msg.model,
          message: message,
          done: msg.done,
          created_at: msg.created_at
        }

        if (msg.done) {
          progress = {
            model: msg.model,
            message: message,
            done: msg.done,
            created_at: msg.created_at,
            total_duration: msg.total_duration,
            load_duration: msg.load_duration,
            prompt_eval_count: msg.prompt_eval_count,
            prompt_eval_duration: msg.prompt_eval_duration,
            eval_count: msg.eval_count,
            eval_duration: msg.eval_duration
          }
        }

        onProgress(progress)

        result = await reader?.read()
      }
    } catch (e) {
      console.log(e)
    }
  }
}
