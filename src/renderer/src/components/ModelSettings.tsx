import { useModalsContext } from '@renderer/contexts/Modals'
import React, { useEffect } from 'react'

export const ModelSettings: React.FC = () => {
  const { hideModal, store } = useModalsContext()
  const { modalProps } = store || {}
  const { title } = modalProps || {}

  useEffect(() => {
    const onStart = async (): Promise<void> => {}
    onStart()
  }, [])

  return (
    <div className="absolute z-[999] bg-slate-400 w-svw bg-opacity-60 transition-opacity duration-300  h-svh flex justify-center items-center">
      <div className="w-5/6 h-5/6 border bg-white border-gray-300">
        <div className="w-full bg-slate-700 text-white flex justify-between items-center p-4">
          <div className="font-bold">{title}</div>

          <button
            className="font-extrabold"
            type="button"
            onClick={() => {
              hideModal()
            }}
          >
            &#9587;
          </button>
        </div>
      </div>
    </div>
  )
}
