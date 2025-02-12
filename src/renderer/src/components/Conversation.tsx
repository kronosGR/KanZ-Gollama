import { useChatStore } from '@renderer/stores/useChatStore'

export const Converstation: React.FC = () => {
  const { getMessages, currentMessage } = useChatStore()

  const showMessages = (): JSX.Element => {
    const length = getMessages().length
    return (
      <>
        {getMessages().map((msg, i) => {
          if (i < length - 1) {
            return (
              <div className="mb-2" key={i}>
                {msg.content}
              </div>
            )
          }
          return (
            <div className="mb-2" key={i}>
              {currentMessage?.content}
            </div>
          )
        })}
      </>
    )
  }

  return <div className="bg-slate-100 w-full h-full">{showMessages()}</div>
}
