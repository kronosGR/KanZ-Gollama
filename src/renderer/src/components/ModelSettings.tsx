import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import React, { useEffect, useState } from 'react'
import { ModelList } from './ModelList'
import { useModelStore } from '@renderer/stores/useModelsStore'
import { pullModel } from '@renderer/utils/pullModel'
import { IPullRequest } from '@renderer/interfaces/IPullRequest'
import { IProgressResponse } from '@renderer/interfaces/IProgressResponse'

export const ModelSettings: React.FC = () => {
  const { showModal, hideModal, getInfoModal } = useModalsContext()
  const { title } = getInfoModal(MODALS.MODEL_SETTINGS_MODAL).modalProps
  const { models, getModels } = useModelStore()
  const [progress, setProgress] = useState(0)
  const [modelName, setModelName] = useState('smollm:135m')

  // useEffect(() => {
  //   console.log(models)
  // }, [models])

  useEffect(() => {
    console.log(`${progress}%`)
  }, [progress])

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
          <input
            type="text"
            value={modelName}
            onChange={(e) => {
              setModelName(e.currentTarget.value)
            }}
          />
          <button
            type="button"
            onClick={async () => {
              const request: IPullRequest = {
                model: modelName,
                stream: true,
                insecure: false
              }
              await pullModel(request, (response: IProgressResponse) => {
                if (response.total && response.completed) {
                  setProgress((response.completed / response.total) * 100)
                }
              })
            }}
          >
            Pull
          </button>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
