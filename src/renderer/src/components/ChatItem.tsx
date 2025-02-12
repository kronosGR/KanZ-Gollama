import { IMessage } from '@renderer/interfaces/IMessage'
import React from 'react'

import { HiMiniUserGroup } from 'react-icons/hi2'
import { FaBrain } from 'react-icons/fa'

interface IProps {
  message: IMessage | null
}

export const ChatItem: React.FC<IProps> = ({ message }) => {
  const location = message?.role === 'assistant' ? 'justify-start' : 'justify-end'
  const color = message?.role === 'assistant' ? ' bg-red-100' : 'j bg-green-200'
  return (
    <div className="flex w-[100%] mb-2">
      <div className={`flex w-[100%] items-center ${location}`}>
        <div>{message?.role === 'assistant' ? <FaBrain /> : <HiMiniUserGroup />}</div>
        <div className={`w-4/6 border p-2 ${color}`}>{message?.content}</div>
      </div>
    </div>
  )
}
