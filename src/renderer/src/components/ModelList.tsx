import { IModel } from '@renderer/interfaces/IModel'
import React, { ReactNode } from 'react'
import { ModelListItem } from './ModelListItem'

interface IProps {
  models: IModel[]
}

export const ModelList: React.FC<IProps> = ({ models }) => {
  const ModelItems = (): ReactNode => {
    return (
      <>
        {models.map((model: IModel) => (
          <ModelListItem key={model.name} model={model} />
        ))}
      </>
    )
  }

  return (
    <div className="h-[90%] overflow-auto border max-h-[90%]">
      <ModelItems />
    </div>
  )
}
