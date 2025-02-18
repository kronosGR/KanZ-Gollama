import { useChatStore } from '@renderer/stores/useChatStore'
import { ChatItem } from './ChatItem'
import { PulseLoader } from 'react-spinners'
import { useEffect, useRef } from 'react'

export const Converstation: React.FC = () => {
  const { getMessages, currentMessage, isWorking, messages } = useChatStore()

  const endChatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (endChatRef.current) {
      endChatRef.current.scrollIntoView()
    }
  }, [currentMessage])

  const showMessages = (): JSX.Element => {
    const length = getMessages().length
    return (
      <div className="p-1">
        {getMessages().map((msg, i) => {
          if (i === length - 1 && msg.role === 'assistant') return
          return <ChatItem key={i} message={msg} />
        })}
        {currentMessage && currentMessage?.content.length > 0 && (
          <>
            <ChatItem key={length} message={currentMessage} />
          </>
        )}
        {isWorking && (
          <div className="flex w-[100%] justify-center items-center">
            <PulseLoader color="#34992f" />
            <div ref={endChatRef}></div>
          </div>
        )}
      </div>
    )
  }

  return <div className="bg-slate-100 w-full h-full  overflow-auto">{showMessages()}</div>
}
