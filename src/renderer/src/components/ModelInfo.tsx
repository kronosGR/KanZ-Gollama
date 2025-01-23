import { IModel } from '@renderer/interfaces/IModel'
import React, { useEffect } from 'react'

interface ModelInfoProps {
  model: IModel
}

const ModelInfo: React.FC<ModelInfoProps> = ({ model }) => {
  useEffect(() => {
    console.log(model)
  }, [model])
  return <div>{model.format}</div>
}

export default ModelInfo
