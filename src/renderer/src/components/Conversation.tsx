import { useChatStore } from '@renderer/stores/useChatStore'
import { ChatItem } from './ChatItem'

export const Converstation: React.FC = () => {
  const { getMessages, currentMessage } = useChatStore()

  const showMessages = (): JSX.Element => {
    const length = getMessages().length
    return (
      <div className="p-1">
        {getMessages().map((msg, i) => {
          if (i === length - 1 && msg.role === 'assistant') return
          return <ChatItem key={i} message={msg} />
        })}
        {currentMessage && currentMessage?.content.length > 0 && (
          <ChatItem key={length} message={currentMessage} />
        )}
      </div>
    )
  }

  return <div className="bg-slate-100 w-full h-full">{showMessages()}</div>
}
