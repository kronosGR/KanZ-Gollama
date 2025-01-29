import { IModel } from '@renderer/interfaces/IModel'
import { convertBytes } from '@renderer/utils/convertBytes'
import { MdDeleteForever } from 'react-icons/md'

import React from 'react'

interface IProps {
  model: IModel
}

export const ModelListItem: React.FC<IProps> = ({ model }) => {
  return (
    <div className="flex w-full hover:bg-gray-100  ">
      <div className="w-2/6">{model.name}</div>
      <div className="w-1/6">{model.family}</div>
      <div className="w-1/6">{model.format}</div>
      <div className="w-1/12">{model.parameterSize}</div>
      <div className="w-1/12">{convertBytes(model.size)}</div>
      <div className="w-1/12 flex justify-end items-center text-red-700">
        <MdDeleteForever />
      </div>
    </div>
  )
}
