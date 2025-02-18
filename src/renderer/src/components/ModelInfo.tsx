import { IMessage } from '@renderer/interfaces/IMessage'
import { IModel } from '@renderer/interfaces/IModel'
import { useChatStore } from '@renderer/stores/useChatStore'
import { numberFormat } from '@renderer/utils/numberFormat'
import React, { useEffect, useState } from 'react'

interface ModelInfoProps {
  model: IModel
}

const ModelInfo: React.FC<ModelInfoProps> = ({ model }) => {
  const { getAIMessages, messages, stats } = useChatStore()
  const [curAIMsg, setCurAIMsg] = useState<IMessage | null>(null)
  useEffect(() => {
    setCurAIMsg(getAIMessages()[getAIMessages().length - 1])
  }, [messages])

  return (
    <>
      <div className="border mt-2 p-2 text-sm">
        <h3 className="font-bold border-b-2 border-red-700">Model Information</h3>
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
          <h3 className="font-bold border-b-2 border-red-700 ">Response Statistics</h3>
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
