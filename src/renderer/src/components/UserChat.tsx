import { useChatStore } from '@renderer/stores/useChatStore'
import React, { useEffect, useRef, useState } from 'react'

interface IProps {
  onSend: (message: string) => void
}

export const UserChat: React.FC<IProps> = ({ onSend }) => {
  const [message, setMessage] = useState<string>()
  const textAreaRef = useRef<HTMLAreaElement>(null)
  const { isWorking } = useChatStore()

  const focusTextArea = (): void => {
    if (textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }

  useEffect(() => {
    focusTextArea()
  }, [isWorking])

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.keyCode === 13 && e.ctrlKey === true) {
      e.preventDefault()
      onSend(message)
      setMessage('')
      focusTextArea()
    }
  }

  return (
    <div className="absolute bottom-4 border border-gray-800 w-[65%] flex flex-col p-2 justify-center items-center">
      <textarea
        autoFocus
        ref={textAreaRef}
        className="border resize-none w-[95%] p-1"
        rows={5}
        value={message}
        disabled={isWorking}
        onChange={(e) => {
          setMessage(e.currentTarget.value)
        }}
        onKeyDown={onEnterPress}
      ></textarea>
      <button
        type="button"
        disabled={isWorking}
        className=" mt-2 bg-blue-500 text-white p-2 rounded disabled:bg-gray-400 px-6"
        onClick={() => {
          onSend(message)
          setMessage('')
          focusTextArea()
        }}
      >
        Send (Ctrl + Enter)
      </button>
    </div>
  )
}
