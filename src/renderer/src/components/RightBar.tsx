import React, { useEffect, useRef, useState } from 'react'
import { UserChat } from './UserChat'
import { useModelStore } from '@renderer/stores/useModelsStore'
import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import { IChatRequest } from '@renderer/interfaces/IChatRequest'
import { chatWithModel } from '@renderer/utils/chatWithModel'
import { IChatResponse } from '@renderer/interfaces/IChatResponse'
import { useChatStore } from '@renderer/stores/useChatStore'
import { Converstation } from './Conversation'

export default function RightBar(): JSX.Element {
  const { selectedModel } = useModelStore()
  const { showModal } = useModalsContext()
  const {
    getMessages,
    resetCurrentMessage,
    setMessage,
    setCurrentMessage,
    setIsWorking,
    messages
  } = useChatStore()
  const [resText, setRestText] = useState('')
  const endChatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (endChatRef.current) {
      endChatRef.current.scrollIntoView()
    }
  }, [messages])

  const abortController = new AbortController()

  const handleChatSend = async (msg: string): Promise<void> => {
    setIsWorking(true)
    resetCurrentMessage()

    if (!selectedModel?.name) {
      showModal(MODALS.NOTIFICATION_MODAL, {
        title: 'Error',
        message: 'No model selected',
        type: 'error'
      })
      return
    }

    setMessage({ role: 'user', content: msg })

    if (!msg) {
      showModal(MODALS.NOTIFICATION_MODAL, {
        title: 'Error',
        message: 'No message to send',
        type: 'error'
      })
      return
    }

    const request: IChatRequest = {
      model: selectedModel?.name,
      stream: true,
      // messages: [{ role: currentMessage?.role, content: currentMessage?.content }]
      messages: getMessages()
    }

    let resTXT = ''
    const result = await chatWithModel(
      request,
      (response: IChatResponse) => {
        resTXT += response.message.content
        setRestText(resTXT)
        setCurrentMessage({ role: 'assistant', content: resTXT }, response.done)
        // if (response.done) {
        //   setMessage({ role: 'assistant', content: resTXT })
        // }
      },
      abortController.signal
    )

    setIsWorking(false)
  }

  return (
    <div className="h-[90%] w-full">
      <div className="border w-[98%] h-[78%] my-2 overflow-auto">
        <Converstation />
      </div>
      <UserChat onSend={handleChatSend} />
    </div>
  )
}
