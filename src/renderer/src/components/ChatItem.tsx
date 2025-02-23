import { IMessage } from '@renderer/interfaces/IMessage'
import React, { useEffect } from 'react'
import { HiMiniUserGroup } from 'react-icons/hi2'
import { FaBrain } from 'react-icons/fa'
import Markdown from 'react-markdown'
import showdown from 'showdown'

interface IProps {
  message: IMessage | null
}

export const ChatItem: React.FC<IProps> = ({ message }) => {
  const location = message?.role === 'assistant' ? 'justify-start' : 'justify-end'
  const bgColor = message?.role === 'assistant' ? ' bg-blue-200' : 'j bg-green-200'
  const color = message?.role === 'assistant' ? ' text-blue-400' : 'j text-green-400'

  return (
    <div className="flex w-[100%] mb-2">
      <div className={`flex w-[100%] items-center ${location}`}>
        <div>
          {message?.role === 'assistant' && <FaBrain className={`text-4xl mr-1 ${color}`} />}
        </div>
        {
          <div className={`w-[80%] border p-2 text-xs  overflow-auto ${bgColor}`}>
            <Markdown>{message?.content}</Markdown>
          </div>
        }
        {/* <div
          className={`w-[80%] border p-2 text-xs  overflow-auto ${bgColor}`}
          dangerouslySetInnerHTML={{ __html: converter.makeHtml(chat) }}
        ></div> */}

        {message?.role === 'user' && <HiMiniUserGroup className={`text-4xl mr-1 ${color}`} />}
      </div>
    </div>
  )
}
