import React, { useEffect } from 'react'
import { fetchUrl } from '../utils/fetchUrl'
import { IModel } from '@renderer/interfaces/IModel'
import { IApiModel } from '@renderer/interfaces/IApiModel'
import { MODELS_GET_BY_NAME } from '@renderer/utils/constants'
import ModelInfo from './ModelInfo'
import { IoSettings } from 'react-icons/io5'
import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import { useModelStore } from '@renderer/stores/useModelsStore'

export default function Models(): JSX.Element {
  const { models, getModels, selectedModel, setSelectedModel } = useModelStore()

  const { showModal, hideModal } = useModalsContext()

  useEffect(() => {
    getModels()
  }, [getModels])

  const handleModelChange = async (e): void => {
    if (e.target.options[e.target.selectedIndex].value === 'none') return

    showModal(MODALS.LOADING_MODAL, { title: 'Loading...' })
    const modelName = e.target.options[e.target.selectedIndex].value

    const options = {
      method: 'POST',
      body: JSON.stringify({ name: modelName })
    }

    const jsonModel = (await fetchUrl(MODELS_GET_BY_NAME, options)) as IApiModel | string

    if (typeof jsonModel === 'string') {
      showModal(MODALS.NOTIFICATION_MODAL, {
        title: 'Error',
        message: "Couldn't fetch model",
        type: 'error'
      })
      hideModal(MODALS.LOADING_MODAL, 'Loading...')
      return
    }
    setSelectedModel({
      name: modelName,
      model: modelName,
      size: +jsonModel.size,
      family: jsonModel.details?.family,
      format: jsonModel.details?.format,
      parameterSize: jsonModel.details?.parameter_size,
      parameterModel: jsonModel.details?.parameter_model,
      quantizationLevel: jsonModel.details?.quantization_level
    })

    hideModal(MODALS.LOADING_MODAL, 'Loading...')
  }

  useEffect(() => {
    showModal(MODALS.LOADING_MODAL, { title: 'Loading...' })
    getModels()
    hideModal(MODALS.LOADING_MODAL, 'Loading...')
  }, [])

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Models</h2>
        <p title="Settings" className="cursor-pointer">
          <button
            onClick={() => showModal(MODALS.MODEL_SETTINGS_MODAL, { title: 'Model Settings' })}
          >
            <IoSettings />
          </button>
        </p>
      </div>
      <select onChange={(e) => handleModelChange(e)}>
        <option value="none">Select model</option>
        {models.map((model) => (
          <option key={model.model} value={model.model}>
            {model.name}
          </option>
        ))}
      </select>
      {selectedModel ? (
        <ModelInfo model={selectedModel} />
      ) : (
        <div className="text-center m-2 text-blue-700">No model selected</div>
      )}
    </div>
  )
}
