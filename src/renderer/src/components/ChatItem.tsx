import { IMessage } from '@renderer/interfaces/IMessage'
import React, { useEffect, useState } from 'react'
import { HiMiniUserGroup } from 'react-icons/hi2'
import { HiClipboardCopy } from 'react-icons/hi'
import { FaBrain } from 'react-icons/fa'
import Markdown from 'react-markdown'
import { marked, use } from 'marked'
import { useChatStore } from '@renderer/stores/useChatStore'
import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import { IoMdStats } from 'react-icons/io'
import { dirtyHTML } from '@renderer/utils/dirtyHTML'

interface IProps {
  message: IMessage | null
}

export const ChatItem: React.FC<IProps> = ({ message }) => {
  const location = message?.role === 'assistant' ? 'justify-start' : 'justify-end'
  const bgColor = message?.role === 'assistant' ? ' bg-blue-200' : 'bg-green-200'
  const borderColor = message?.role === 'assistant' ? ' border-blue-100' : 'border-green-100'
  const color = message?.role === 'assistant' ? ' text-blue-400' : 'text-green-400'

  const { isWorking } = useChatStore()
  const { showModal } = useModalsContext()

  const handleCopy = (content: string): void => {
    showModal(MODALS.NOTIFICATION_MODAL, {
      title: 'Copy Code',
      message: 'Copied to Clipboard',
      type: 'success'
    })

    navigator.clipboard.writeText(content)
  }

  const handleStatistics = (
    message: IMessage,
    e: React.MouseEvent<SVGElement, MouseEvent>
  ): void => {
    showModal(MODALS.STATISTICS_MODAL, {
      title: 'Response Statistics',
      msg: message,
      x: e.clientX,
      y: e.clientY
    })
  }

  const onKeysDown = (e: KeyboardEvent): void => {
    if ((e.key === 'c' || e.key === 'C') && e.ctrlKey === true) {
      navigator.clipboard.writeText(document.getSelection()?.toString())
    }
  }

  useEffect(() => {
    document.addEventListener('selectionchange', () => {})

    document.addEventListener('keydown', onKeysDown)

    return function cleanup(): void {
      document.removeEventListener('keydown', onKeysDown)
      document.removeEventListener('selectionchange', () => {})
    }
  }, [])

  return (
    <div className="flex w-[100%] mb-2">
      <div className={`flex w-[100%] items-center ${location}`}>
        <div>
          {message?.role === 'assistant' && <FaBrain className={`text-4xl mr-1 ${color}`} />}
        </div>
        {
          <div className={`w-[85%] border p-2 text-xs  overflow-auto ${bgColor}`}>
            <div className={`border-b-2 flex justify-end p-1 mb-3 ${borderColor}`}>
              {message?.role === 'assistant' && (
                <IoMdStats
                  className="cursor-pointer"
                  title="Response Statistics"
                  onClick={(e) => handleStatistics(message, e)}
                />
              )}
              <HiClipboardCopy
                title="Copy to Clipboard"
                className="cursor-pointer"
                onClick={() => handleCopy(message?.content)}
              />
            </div>

            {isWorking && (
              <div dangerouslySetInnerHTML={dirtyHTML(marked.parse(message?.content))}></div>
            )}
            {!isWorking && (
              <Markdown
                components={{
                  pre: ({ node, children, ...props }) => {
                    let language = node?.children[0]?.properties?.className[0].replace(
                      'language-',
                      ''
                    )

                    const content = node?.children[0]?.children[0]?.value || ''
                    return (
                      <pre className="bg-blue-100 my-3 p-1 text-wrap" {...props}>
                        <div className="border-b-2 border-blue-200  flex justify-between p-1 mb-3">
                          <div className="font-bold italic text-[10px] ">{language}</div>
                          <HiClipboardCopy
                            title="Copy to Clipboard"
                            className="cursor-pointer"
                            onClick={() => handleCopy(content)}
                          />
                        </div>
                        {children}
                      </pre>
                    )
                  },
                  code: ({ ...props }) => <code className="bg-slate-100 px-1 " {...props} />
                }}
              >
                {message?.content}
              </Markdown>
            )}
          </div>
        }

        {message?.role === 'user' && <HiMiniUserGroup className={`text-4xl mr-1 ${color}`} />}
      </div>
    </div>
  )
}
