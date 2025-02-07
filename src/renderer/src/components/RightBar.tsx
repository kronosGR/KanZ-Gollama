import React, { useState } from 'react'
import { UserChat } from './UserChat'
import { CHAT } from '@renderer/utils/constants'
import { useModelStore } from '@renderer/stores/useModelsStore'
import { fetchUrl } from '@renderer/utils/fetchUrl'
import { IFetchParams } from '@renderer/interfaces/IFetchParams'
import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import { IChatRequest } from '@renderer/interfaces/IChatRequest'
import { chatWithModel } from '@renderer/utils/chatWithModel'
import { IChatResponse } from '@renderer/interfaces/IChatResponse'

export default function RightBar(): JSX.Element {
  const { selectedModel } = useModelStore()
  const { showModal } = useModalsContext()

  const handleChatSend = async (message: string): Promise<void> => {
    if (!selectedModel?.name) {
      showModal(MODALS.NOTIFICATION_MODAL, {
        title: 'Error',
        message: 'No model selected',
        type: 'error'
      })
      return
    }

    const abortController = new AbortController()

    const request: IChatRequest = {
      model: selectedModel?.name,
      stream: true,
      messages: [{ role: 'user', content: message }]
    }

    const result = await chatWithModel(
      request,
      (response: IChatResponse) => {
        console.log('response', response)
      },
      abortController.signal
    )
  }

  return (
    <div className="h-screen w-full">
      <UserChat onSend={handleChatSend} />
    </div>
  )
}
