import { FaPlus } from 'react-icons/fa'
import { useChatStore } from '@renderer/stores/useChatStore'
import { ConversationItem } from './ConversationItem'

export const Conversations: React.FC = () => {
  const { conversations, setConversations } = useChatStore()

  const handleAddConversation = (): void => {
    const len = conversations.length
    let newId = len + 1
    while (conversations.some((conv) => conv.name === `Default ${newId}`)) {
      newId += 1
    }
    setConversations([...conversations, { name: `Default ${newId}`, messages: [] }])
  }
  return (
    <div className="h-[100%]">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Models</h2>
        <div>
          <FaPlus
            title="Add Conversation"
            className="cursor-pointer"
            onClick={handleAddConversation}
          />
        </div>
      </div>
      <div className="h-[90%] overflow-auto ">
        {conversations.map((conversation) => (
          <ConversationItem key={conversation.name} conversation={conversation} />
        ))}
      </div>
    </div>
  )
}
