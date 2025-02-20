import { IMessage } from '@renderer/interfaces/IMessage'
import { IModel } from '@renderer/interfaces/IModel'
import { useChatStore } from '@renderer/stores/useChatStore'
import { numberFormat } from '@renderer/utils/numberFormat'
import React, { useEffect, useState } from 'react'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'

interface ModelInfoProps {
  model: IModel
}

const ModelInfo: React.FC<ModelInfoProps> = ({ model }) => {
  const { getAIMessages, messages, stats } = useChatStore()
  const [curAIMsg, setCurAIMsg] = useState<IMessage | null>(null)
  const [curMsgIdx, setCurMsgIdx] = useState<number>(0)

  useEffect(() => {
    setCurMsgIdx(getAIMessages().length === 0 ? 0 : getAIMessages().length - 1)
    setCurAIMsg(getAIMessages()[curMsgIdx])
  }, [messages])

  const handleNextStat = (): void => {
    setCurMsgIdx((prev) => {
      const newIdx = prev === getAIMessages().length - 1 ? prev : prev + 1
      setCurAIMsg(getAIMessages()[newIdx])
      return newIdx
    })
  }

  const handlePrevStat = (): void => {
    setCurMsgIdx((prev) => {
      const newIdx = prev === 0 ? prev : prev - 1
      setCurAIMsg(getAIMessages()[newIdx])
      return newIdx
    })
  }

  return (
    <>
      <div className="border mt-2 p-2 text-sm">
        <h3 className="font-bold ">Model Information</h3>
        <div className="flex">
          <p className="me-2 ms-2 font-semibold">Name:</p>
          <p>{model.name}</p>
        </div>
        <div className="flex">
          <p className="me-2 ms-2 font-semibold">Model:</p>
          <p>{model.model}</p>
        </div>
        <div className="flex">
          <p className="me-2 ms-2 font-semibold">Family:</p>
          <p>{model.family}</p>
        </div>
        <div className="flex">
          <p className="me-2 ms-2 font-semibold">Format:</p>
          <p>{model.format}</p>
        </div>
        <div className="flex">
          <p className="me-2 ms-2 font-semibold">Parameter Size:</p>
          <p>{model.parameterSize}</p>
        </div>
        <div className="flex">
          <p className="me-2 ms-2 font-semibold">Quantization Level:</p>
          <p>{model.quantizationLevel}</p>
        </div>
      </div>
      {getAIMessages().length > 0 && stats && (
        <div className="border mt-2 p-2 text-sm">
          <div className="flex border-b-2 border-red-700 justify-between">
            <h3 className="font-bold ">Response Statistics</h3>
            <div className="flex">
              <FaChevronCircleLeft
                className={`me-1 ${curMsgIdx === 0 ? 'cursor-default' : ' cursor-pointer'}`}
                style={{ color: curMsgIdx === 0 ? 'gray' : 'blue' }}
                onClick={handlePrevStat}
              />
              <FaChevronCircleRight
                style={{ color: curMsgIdx === getAIMessages().length - 1 ? 'gray' : 'blue' }}
                onClick={handleNextStat}
                className={`${curMsgIdx === getAIMessages().length - 1 ? 'cursor-default' : ' cursor-pointer'}`}
              />
            </div>
          </div>
          <div className="flex  text-xs">
            <p className="me-2 ms-2 font-semibold">Total Duration:</p>
            <p>{numberFormat(curAIMsg?.total_duration ?? 0)} secs</p>
          </div>
          <div className="flex text-xs">
            <p className="me-2 ms-2 font-semibold">Load Duration:</p>
            <p>{numberFormat(curAIMsg?.load_duration ?? 0)} secs</p>
          </div>
          <div className="flex text-xs">
            <p className="me-2 ms-2 font-semibold">Prompt Eval Count:</p>
            <p>{curAIMsg?.prompt_eval_count}</p>
          </div>
          <div className="flex text-xs">
            <p className="me-2 ms-2 font-semibold">Prompt Eval Duration:</p>
            <p>{numberFormat(curAIMsg?.prompt_eval_duration ?? 0)} secs</p>
          </div>
          <div className="flex text-xs">
            <p className="me-2 ms-2 font-semibold">Eval Count:</p>
            <p>{curAIMsg?.eval_count}</p>
          </div>
          <div className="flex text-xs">
            <p className="me-2 ms-2 font-semibold">Eval Duration:</p>
            <p>{numberFormat(curAIMsg?.eval_duration ?? 0)} secs</p>
          </div>
        </div>
      )}
    </>
  )
}

export default ModelInfo
