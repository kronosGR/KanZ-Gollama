import React, { useEffect } from 'react'
import { fetchUrl } from '../utils/fetchUrl'
import { IModel } from '@renderer/interfaces/IModel'
import { IApiModel } from '@renderer/interfaces/IApiModel'
import { MODELS_GET_BY_NAME, MODELS_GET_URL } from '@renderer/utils/constants'
import ModelInfo from './ModelInfo'
import { IoSettings } from 'react-icons/io5'
import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import { normalize } from 'path'
import { normalizeModel } from '@renderer/utils/normalizeModel'

export default function Models(): JSX.Element {
  const [models, setModels] = React.useState<IModel[]>([])
  const [model, setModel] = React.useState<IModel | null>(null)

  const { showModal, hideModal } = useModalsContext()

  useEffect(() => {
    // console.log(models)
  }, [models])

  const handleModelChange = async (e): void => {
    showModal(MODALS.LOADING_MODAL, { title: 'Loading...' })
    const modelName = e.target.options[e.target.selectedIndex].value

    const options = {
      method: 'POST',
      body: JSON.stringify({ name: modelName })
    }

    const jsonModel = (await fetchUrl(MODELS_GET_BY_NAME, options)) as IApiModel

    setModel({
      name: modelName,
      model: modelName,
      size: +jsonModel.size,
      family: jsonModel.details?.family,
      format: jsonModel.details?.format,
      parameterSize: jsonModel.details?.parameter_size,
      parameterModel: jsonModel.details?.parameter_model,
      quantizationLevel: jsonModel.details?.quantization_level
    })

    hideModal(MODALS.LOADING_MODAL)
  }

  useEffect(() => {
    showModal(MODALS.LOADING_MODAL, { title: 'Loading...' })

    const onStart = async (): Promise<void> => {
      const json = await fetchUrl(MODELS_GET_URL, {})

      const modelsData: IModel[] = (json['models'] as IApiModel[]).map((model: IApiModel) =>
        normalizeModel(model)
      )
      setModels(modelsData)
      hideModal(MODALS.LOADING_MODAL)
    }

    onStart()
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
        {models.map((model) => (
          <option key={model.model} value={model.model}>
            {model.name}
          </option>
        ))}
      </select>
      {model ? (
        <ModelInfo model={model} />
      ) : (
        <div className="text-center m-2 text-blue-700">No model selected</div>
      )}
    </div>
  )
}
