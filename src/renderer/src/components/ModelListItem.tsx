import { IModel } from '@renderer/interfaces/IModel'
import { convertBytes } from '@renderer/utils/convertBytes'
import { MdDeleteForever } from 'react-icons/md'
import React from 'react'
import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import { MODELS_DELETE_BY_NAME } from '@renderer/utils/constants'
import { fetchUrl } from '@renderer/utils/fetchUrl'
import { useModelStore } from '@renderer/stores/useModelsStore'

interface IProps {
  model: IModel
}

export const ModelListItem: React.FC<IProps> = ({ model }) => {
  const { showModal } = useModalsContext()
  const { getModels, isDownloading } = useModelStore()

  const deleteModel = async (e: React.MouseEvent<SVGAElement>): Promise<void> => {
    e.preventDefault()
    const id = e.currentTarget.id

    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({ name: id })
    }

    // const response = (await fetchUrl(MODELS_DELETE_BY_NAME, options)) as unknown as IStatusResponse
    // console.log('--Response', response)

    await fetchUrl(MODELS_DELETE_BY_NAME, options)
    showModal(MODALS.NOTIFICATION_MODAL, {
      title: 'Model deleted',
      message: `The model ${id} has been deleted.`,
      type: 'success'
    })

    await getModels()
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
        <MdDeleteForever
          id={model.name}
          className={
            isDownloading ? 'cursor-wait pointer-events-none' : 'cursor-pointer pointer-events-auto'
          }
          onClick={deleteModel}
        />
      </div>
    </div>
  )
}
