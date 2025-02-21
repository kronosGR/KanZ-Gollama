import { useChatStore } from '@renderer/stores/useChatStore'
import React, { useEffect, useRef, useState } from 'react'
import { FaChevronCircleUpt, FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa'
import { title } from 'process'
import { IMessage } from '@renderer/interfaces/IMessage'

interface IProps {
  onSend: (message: string) => void
  onHandleAbort: () => void
}

export const UserChat: React.FC<IProps> = ({ onSend, onHandleAbort }) => {
  const [message, setMessage] = useState<string>()
  const [curUserMsg, setCurUserMsg] = useState<IMessage | null>(null)
  const [curMsgIdx, setCurMsgIdx] = useState<number>(0)
  const { getUserMessages, messages } = useChatStore()
  const textAreaRef = useRef<HTMLAreaElement>(null)
  const { isWorking } = useChatStore()

  const focusTextArea = (): void => {
    if (textAreaRef.current) {
      textAreaRef.current.focus()
    }
  }

  const updateMessageHistory = (): void => {
    setCurMsgIdx(getUserMessages().length - 1)
  }

  useEffect(() => {
    setCurUserMsg(getUserMessages()[curMsgIdx])
    setMessage(curUserMsg?.content)
  }, [curMsgIdx])

  useEffect(() => {
    setMessage(curUserMsg?.content)
  }, [curUserMsg])

  useEffect(() => {
    focusTextArea()
  }, [isWorking])

  useEffect(() => {
    updateMessageHistory()
  }, [messages])

  useEffect((): (() => void) => {
    updateMessageHistory()
    const onKeysDown = (e: KeyboardEvent): void => {
      if ((e.key === 'c' || e.key === 'C') && e.ctrlKey === true) {
        onHandleAbort()
        focusTextArea()
      }

      if (e.key === 'ArrowUp' && e.ctrlKey === true) {
        handlePrevMsg()
        focusTextArea()
      }

      if (e.key === 'ArrowDown' && e.ctrlKey === true) {
        handleNextMsg()
        focusTextArea()
      }
    }
    document.addEventListener('keydown', onKeysDown)

    return function cleanup() {
      document.removeEventListener('keydown', onKeysDown)
    }
  }, [])

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && e.ctrlKey === true) {
      e.preventDefault()
      onSend(message)
      setMessage('')
      focusTextArea()
    }
  }

  const handlePrevMsg = (): void => {
    setCurMsgIdx((prev) => {
      if (prev === 0) {
        // console.log('Index is already zero, no decrement.')
        return prev
      } else {
        const newIndex = --prev
        // console.log('New Index:', newIndex)
        return newIndex
      }
    })
  }

  const handleNextMsg = (): void => {
    setCurMsgIdx((prev) => {
      if (prev === getUserMessages().length - 1) {
        // console.log('Index is already max, no increment.')
        return prev
      } else {
        const newIndex = ++prev
        // console.log('New Index:', newIndex)
        return newIndex
      }
    })
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
      <div className="flex items-center">
        {!isWorking && (
          <FaChevronCircleUp
            title="Ctrl + ⇧"
            className={`me-1 text-4xl ${curMsgIdx === 0 ? 'cursor-default' : ' cursor-pointer'}`}
            style={{ color: curMsgIdx === 0 ? 'gray' : 'blue' }}
            onClick={curMsgIdx === 0 ? undefined : handlePrevMsg}
          />
        )}
        <button
          type="button"
          title="Ctrl + Enter"
          disabled={isWorking}
          className=" m-2 bg-blue-500 text-white p-2 rounded disabled:bg-gray-400 px-6"
          onClick={() => {
            onSend(message)
            setMessage('')
            focusTextArea()
          }}
        >
          Send
        </button>
        {isWorking && (
          <button
            title="Ctrl + C"
            type="button"
            className="m-2 bg-red-500 text-white p-2 rounded "
            onClick={onHandleAbort}
          >
            Cancel
          </button>
        )}
        {!isWorking && (
          <FaChevronCircleDown
            title="Ctrl + ⇩"
            style={{
              color:
                getUserMessages().length === 0
                  ? 'gray'
                  : curMsgIdx === getUserMessages().length - 1
                    ? 'gray'
                    : 'blue'
            }}
            onClick={
              getUserMessages().length === 0
                ? undefined
                : curMsgIdx === getUserMessages().length - 1
                  ? undefined
                  : handleNextMsg
            }
            className={`text-4xl ${
              getUserMessages().length === 0
                ? undefined
                : curMsgIdx === getUserMessages().length - 1
                  ? 'cursor-default'
                  : ' cursor-pointer'
            }`}
          />
        )}
      </div>
    </div>
  )
}
