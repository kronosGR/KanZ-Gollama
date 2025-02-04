import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import React, { useEffect, useState } from 'react'
import { ModelList } from './ModelList'
import { useModelStore } from '@renderer/stores/useModelsStore'
import { pullModel } from '@renderer/utils/pullModel'
import { IPullRequest } from '@renderer/interfaces/IPullRequest'
import { IProgressResponse } from '@renderer/interfaces/IProgressResponse'
import { FaSearch } from 'react-icons/fa'

export const ModelSettings: React.FC = () => {
  const { showModal, hideModal, getInfoModal } = useModalsContext()
  const { title } = getInfoModal(MODALS.MODEL_SETTINGS_MODAL).modalProps
  const { models, getModels, isDownloading, setIsDownloading, isModelExists } = useModelStore()
  const [progress, setProgress] = useState(0)
  const [progressStatus, setProgressStatus] = useState<string | undefined>('')
  const [modelName, setModelName] = useState('smollm:135m')

  // useEffect(() => {
  //   console.log(progressStatus)
  // }, [progressStatus])

  useEffect(() => {
    const asyncExs = async (): Promise<void> => {
      await getModels()
    }

    if (!isDownloading && progressStatus === 'success') {
      asyncExs()
      setModelName('')

      showModal(MODALS.NOTIFICATION_MODAL, {
        title: 'Model Pulled',
        message: `The model ${modelName} has been pulled.`,
        type: 'success'
      })
    }
  }, [progressStatus])

  useEffect(() => {
    showModal(MODALS.LOADING_MODAL, { title: 'Loading...' })
    getModels()
    hideModal(MODALS.LOADING_MODAL, 'Loading...')
  }, [])

  const handleDownload = async (): Promise<void> => {
    setIsDownloading(true)
    const request: IPullRequest = {
      model: modelName,
      stream: true,
      insecure: false
    }

    if (modelName === null || modelName === '') {
      showModal(MODALS.NOTIFICATION_MODAL, {
        title: 'Error',
        message: 'Please enter a model name',
        type: 'error'
      })
      setIsDownloading(false)
      return
    }

    if (isModelExists(modelName)) {
      showModal(MODALS.NOTIFICATION_MODAL, {
        title: 'Error',
        message: 'Model already pulled',
        type: 'error'
      })
      setIsDownloading(false)
      return
    }

    await pullModel(request, (response: IProgressResponse) => {
      if (response.status === 'Failed to pull model') {
        console.log(response)
        showModal(MODALS.NOTIFICATION_MODAL, {
          title: 'Error',
          message: response.status,
          type: 'error'
        })
        setIsDownloading(false)
      }

      if (response.total && response.completed) {
        setProgressStatus(response.status)
        setProgress((response.completed / response.total) * 100)
      }
      if (response.status === 'success') {
        setIsDownloading(false)
      }
    })
  }

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
        <div className="h-full flex flex-col p-4">
          <div className="h-3/5">
            <span className="font-bold">Installed Models</span>
            <ModelList models={models} />
          </div>
          <div className="h-2/5 mt-10">
            <span className="font-bold">Pull a Model</span>
            <div className="border border-gray-300 p-4 h-2/3">
              <div className="flex justify-center items-center">
                <label htmlFor="model">Model Name</label>
                <input
                  disabled={isDownloading}
                  className="border m-2 border-gray-300 p-2 disabled:text-gray-400"
                  type="text"
                  value={modelName}
                  onChange={(e) => {
                    setModelName(e.currentTarget.value)
                  }}
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400"
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  Pull Model
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400 ml-2 p-2 h-10 w-10 flex justify-center items-center"
                  onClick={() => showModal(MODALS.MODEL_SEARCH, { title: 'Model Search' })}
                  disabled={isDownloading}
                  title="Search Model"
                >
                  <FaSearch />
                </button>
              </div>
              {isDownloading && (
                <div className="w-full bg-gray-200 rounded-full h-6 text-center">
                  <div
                    className="bg-blue-600 h-6 rounded-full text-center"
                    style={{ width: `${progress}%` }}
                  ></div>
                  <div className="relative -top-6">{progress.toFixed(2)}%</div>
                  <div className="">{progressStatus}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
