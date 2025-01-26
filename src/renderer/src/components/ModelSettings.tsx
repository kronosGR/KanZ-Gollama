import { useModalsContext } from '@renderer/contexts/Modals'
import React from 'react'

export const ModelSettings: React.FC = () => {
  const { hideModal, store } = useModalsContext()
  const { modalProps } = store || {}
  const { title } = modalProps || {}

  return (
    <div className="absolute z-[999] bg-slate-400 w-svw bg-opacity-60 transition-opacity duration-300  h-svh flex justify-center items-center">
      <div className=" border border-gray-300  p-4">
        <h1 className="">{title}</h1>

        <button
          type="button"
          onClick={() => {
            hideModal()
          }}
        >
          &#9587;
        </button>
      </div>
    </div>
  )
}
