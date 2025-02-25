import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import { numberFormat } from '@renderer/utils/numberFormat'
import React, { ReactNode, useEffect } from 'react'

export const Statistics: React.FC = (): ReactNode => {
  const { getInfoModal, hideModal } = useModalsContext()
  const { title, x = 0, y = 0, msg } = getInfoModal(MODALS.STATISTICS_MODAL).modalProps

  useEffect(() => {
    //   hideModal(MODALS.NOTIFICATION_MODAL)
    // console.log(x, y)
  }, [])

  return (
    <div
      style={{ top: `${y + 20}px`, left: `${x - 270}px` }}
      className={`absolute bg-slate-300 z-[1000]  border-2  w-2/6 p-2`}
    >
      <div className="border-b-2">
        <div className="flex justify-between">
          <div>{title}</div>
          <button
            className="font-extrabold"
            type="button"
            onClick={() => {
              hideModal(MODALS.STATISTICS_MODAL, title ?? '')
            }}
          >
            &#9587;
          </button>
        </div>
      </div>
      <div className="flex  text-xs">
        <p className="me-2 ms-2 font-semibold">Total Duration:</p>
        <p>{numberFormat(msg?.total_duration ?? 0)} secs</p>
      </div>
      <div className="flex text-xs">
        <p className="me-2 ms-2 font-semibold">Load Duration:</p>
        <p>{numberFormat(msg?.load_duration ?? 0)} secs</p>
      </div>
      <div className="flex text-xs">
        <p className="me-2 ms-2 font-semibold">Prompt Eval Count:</p>
        <p>{msg?.prompt_eval_count}</p>
      </div>
      <div className="flex text-xs">
        <p className="me-2 ms-2 font-semibold">Prompt Eval Duration:</p>
        <p>{numberFormat(msg?.prompt_eval_duration ?? 0)} secs</p>
      </div>
      <div className="flex text-xs">
        <p className="me-2 ms-2 font-semibold">Eval Count:</p>
        <p>{msg?.eval_count}</p>
      </div>
      <div className="flex text-xs">
        <p className="me-2 ms-2 font-semibold">Eval Duration:</p>
        <p>{numberFormat(msg?.eval_duration ?? 0)} secs</p>
      </div>
    </div>
  )
}
