import React, { MouseEventHandler, ReactNode } from 'react'
import { FaSearch } from 'react-icons/fa'

interface IProps {
  models: string[]
  onClick: (event: MouseEventHandler<HTMLDivElement>) => void
}

export const SearchList: React.FC<IProps> = ({ models, onClick }) => {
  const ModelItems = (): ReactNode => {
    return (
      <div>
        {models.map((model: string, i: number) => (
          <div
            data-model={model}
            key={i}
            className="mx-2 flex items-center justify-between hover:bg-gray-400 hover:text-white hover:cursor-pointer "
            onClick={onClick}
          >
            <div className="me-36">{model}</div>
            <FaSearch />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto border max-h-1/2">
      <ModelItems />
    </div>
  )
}
