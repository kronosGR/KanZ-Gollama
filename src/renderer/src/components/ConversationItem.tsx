import { IConversation } from '../interfaces/IConversation'
import { FaMinus } from 'react-icons/fa'
import { useChatStore } from '../stores/useChatStore'
import { unloadModel } from '@renderer/utils/unloadModel'
import { MODALS, useModalsContext } from '@renderer/contexts/Modals'

interface IProps {
  conversation: IConversation
}

export const ConversationItem: React.FC<IProps> = ({ conversation }) => {
  const { conversations, setConversations, currentConversation, setCurrentConversation } =
    useChatStore()

  const { showModal, hideModal } = useModalsContext()

  const handleRemove = (): void => {
    if (conversations.length === 1) return
    setConversations(conversations.filter((conv) => conv.name !== conversation.name))
  }

  const handleConversationChange = (): void => {
    showModal(MODALS.LOADING_MODAL, { title: 'Loading...' })

    // unload model
    const curModel = currentConversation.model
    unloadModel(curModel)

    // set current conversation
    setCurrentConversation(conversation.name)

    // load messages

    // change model in models

    hideModal(MODALS.LOADING_MODAL, 'Loading...')
  }
  return (
    <div
      className="px-1 cursor-pointer h-[30px] flex justify-between items-center border-y hover:bg-slate-200"
      onClick={handleConversationChange}
    >
      <div className="text-sm">{conversation.name}</div>
      <div>
        <FaMinus onClick={handleRemove} />
      </div>
    </div>
  )
}
