import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import React, { useEffect } from 'react'
import { ModelList } from './ModelList'
import { useModelStore } from '@renderer/stores/useModelsStore'

export const ModelSettings: React.FC = () => {
  const { showModal, hideModal, getInfoModal } = useModalsContext()
  const { title } = getInfoModal(MODALS.MODEL_SETTINGS_MODAL).modalProps
  const { models, getModels } = useModelStore()

  // useEffect(() => {
  //   console.log(models)
  // }, [models])

  useEffect(() => {
    showModal(MODALS.LOADING_MODAL, { title: 'Loading...' })

    getModels()
    hideModal(MODALS.LOADING_MODAL, 'Loading...')
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
              hideModal(MODALS.MODEL_SETTINGS_MODAL, 'Model Settings')
            }}
          >
            &#9587;
          </button>
        </div>
        <div className="p-4">
          <ModelList models={models} />
        </div>
      </div>
    </div>
  )
}
