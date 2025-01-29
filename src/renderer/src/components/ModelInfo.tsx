import { IModel } from '@renderer/interfaces/IModel'
import React, { useEffect } from 'react'

interface ModelInfoProps {
  model: IModel
}

const ModelInfo: React.FC<ModelInfoProps> = ({ model }) => {
  // useEffect(() => {
  //   console.log(model)
  // }, [model])
  return (
    <div className="border mt-2 p-2 text-sm">
      <h3 className="font-bold border-b-2 border-red-700">Model Information</h3>
      <div className="flex">
        <p className="me-2 ms-2 font-semibold">Name:</p>
        <p>{model.name}</p>
      </div>
      <div className="flex">
        <p className="me-2 ms-2 font-semibold">Model:</p>
        <p>{model.model}</p>
      </div>
      <div className="flex">
        <p className="me-2 ms-2 font-semibold">Family:</p>
        <p>{model.family}</p>
      </div>
      <div className="flex">
        <p className="me-2 ms-2 font-semibold">Format:</p>
        <p>{model.format}</p>
      </div>
      <div className="flex">
        <p className="me-2 ms-2 font-semibold">Parameter Size:</p>
        <p>{model.parameterSize}</p>
      </div>
      <div className="flex">
        <p className="me-2 ms-2 font-semibold">Quantization Level:</p>
        <p>{model.quantizationLevel}</p>
      </div>
    </div>
  )
}

export default ModelInfo
