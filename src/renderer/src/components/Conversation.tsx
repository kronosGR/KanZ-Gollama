import { useChatStore } from '@renderer/stores/useChatStore'
import { ChatItem } from './ChatItem'
import { PulseLoader } from 'react-spinners'

export const Converstation: React.FC = () => {
  const { getMessages, currentMessage, isWorking } = useChatStore()

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
        {isWorking && (
          <div className="flex w-[100%] justify-center items-center">
            <PulseLoader color="#34992f" />
          </div>
        )}
      </div>
    )
  }

  return <div className="bg-slate-100 w-full h-full">{showMessages()}</div>
}
