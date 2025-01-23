import React, { CSSProperties, useEffect } from 'react'
import { fetchUrl } from '../utils/fetchUrl'
import { IModel } from '@renderer/interfaces/IModel'
import { IApiModel } from '@renderer/interfaces/IApiModel'
import { BounceLoader } from 'react-spinners'
import { MODELS_GET_BY_NAME, MODELS_GET_URL } from '@renderer/utils/constants'
import ModelInfo from './ModelInfo'

const loadingCSS: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
}

export default function Models(): JSX.Element {
  const [models, setModels] = React.useState<IModel[]>([])
  const [model, setModel] = React.useState<IModel | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  useEffect(() => {
    // console.log(models)
  }, [models])

  const handleModelChange = async (e): void => {
    setIsLoading(true)
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

    setIsLoading(false)
  }

  useEffect(() => {
    const onStart = async (): Promise<void> => {
      setIsLoading(true)
      const json = await fetchUrl(MODELS_GET_URL, {})

      const modelsData: IModel[] = (json['models'] as IApiModel[]).map((model: IApiModel) => ({
        name: model.name,
        model: model.model,
        size: +model.size,
        family: model.details?.family,
        format: model.details?.format,
        parameterSize: model.details?.parameter_size,
        parameterModel: model.details?.parameter_model,
        quantizationLevel: model.details?.quantization_level
      }))
      setModels(modelsData)
      setIsLoading(false)
    }

    onStart()
  }, [])
  return (
    <div>
      <div>Models</div>
      <select onChange={(e) => handleModelChange(e)}>
        {models.map((model) => (
          <option key={model.model} value={model.model}>
            {model.name}
          </option>
        ))}
      </select>
      {model ? <ModelInfo model={model} /> : <div>No model selected</div>}
      <BounceLoader
        color="blue"
        loading={isLoading}
        cssOverride={loadingCSS}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
