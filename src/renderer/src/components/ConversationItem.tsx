import { IConversation } from '../interfaces/IConversation'
import { FaMinus } from 'react-icons/fa'
import { useChatStore } from '../stores/useChatStore'

interface IProps {
  conversation: IConversation
}

export const ConversationItem: React.FC<IProps> = ({ conversation }) => {
  const { conversations, setConversations } = useChatStore()

  const handleRemove = (): void => {
    if (conversations.length === 1) return
    setConversations(conversations.filter((conv) => conv.name !== conversation.name))
  }
  return (
    <div className="px-1 cursor-pointer h-[30px] flex justify-between items-center border-y hover:bg-slate-100">
      <div className="text-sm">{conversation.name}</div>
      <div>
        <FaMinus onClick={handleRemove} />
      </div>
    </div>
  )
}
