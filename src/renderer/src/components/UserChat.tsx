import { useChatStore } from '@renderer/stores/useChatStore'
import React, { useState } from 'react'

interface IProps {
  onSend: (message: string) => void
}

export const UserChat: React.FC<IProps> = ({ onSend }) => {
  const [message, setMessage] = useState<string>()

  return (
    <div className="absolute bottom-4 border border-gray-800 w-[65%] flex flex-col p-2 justify-center items-center">
      <textarea
        className="border resize-none w-[95%] p-1"
        rows={5}
        value={message}
        onChange={(e) => {
          setMessage(e.currentTarget.value)
        }}
      ></textarea>
      <button
        type="button"
        className=" mt-2 bg-blue-500 text-white p-2 rounded disabled:bg-gray-400 px-6"
        onClick={() => {
          onSend(message)
          setMessage('')
        }}
      >
        Send
      </button>
    </div>
  )
}
