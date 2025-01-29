import { IModel } from '@renderer/interfaces/IModel'
import { convertBytes } from '@renderer/utils/convertBytes'
import { MdDeleteForever } from 'react-icons/md'

import React from 'react'

interface IProps {
  model: IModel
}

export const ModelListItem: React.FC<IProps> = ({ model }) => {
  const deleteModel = async (e: React.MouseEvent<SVGAElement>): Promise<void> => {
    e.preventDefault()
    console.log(e.currentTarget.id)
  }
  return (
    <div className="flex w-full hover:bg-gray-100 text-sm cursor-text  ">
      <div className="w-2/6 ms-3" title="Model Name">
        {model.name}
      </div>
      <div className="w-1/6" title="Model Family">
        {model.family}
      </div>
      <div className="w-1/6" title="Model Format">
        {model.format}
      </div>
      <div className="w-1/6 flex justify-end items-end" title="Model Parameter Size">
        {model.parameterSize}
      </div>
      <div className="w-1/6 flex justify-end items-end" title="Model Size">
        {convertBytes(model.size)}
      </div>
      <div className="w-1/12 flex justify-end items-center text-red-700" title="Remove Model">
        <MdDeleteForever id={model.name} className="cursor-pointer" onClick={deleteModel} />
      </div>
    </div>
  )
}
