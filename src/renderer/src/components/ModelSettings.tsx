import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import { IApiModel } from '@renderer/interfaces/IApiModel'
import { IModel } from '@renderer/interfaces/IModel'
import { MODELS_GET_URL } from '@renderer/utils/constants'
import { fetchUrl } from '@renderer/utils/fetchUrl'
import { normalizeModel } from '@renderer/utils/normalizeModel'
import React, { useEffect } from 'react'

export const ModelSettings: React.FC = () => {
  const { showModal, hideModal, store } = useModalsContext()
  const { modalProps } = store || {}
  const { title } = modalProps || {}
  const [models, setModels] = React.useState<IModel[]>([])

  useEffect(() => {
    console.log(models)
  }, [models])

  useEffect(() => {
    showModal(MODALS.LOADING_MODAL, { title: 'Loading...' })
    const onStart = async (): Promise<void> => {
      const json = await fetchUrl(MODELS_GET_URL, {})

      const modelsData: IModel[] = (json['models'] as IApiModel[]).map((model: IApiModel) =>
        normalizeModel(model)
      )
      setModels(modelsData)
    }

    onStart()
    hideModal(MODALS.LOADING_MODAL)
  }, [])

  return (
    <div className="absolute z-[999] bg-slate-400 w-svw bg-opacity-60 transition-opacity duration-300  h-svh flex justify-center items-center">
      <div className="w-5/6 h-5/6 border bg-white border-gray-300">
        <div className="w-full bg-slate-700 text-white flex justify-between items-center p-4">
          <div className="font-bold">{title}</div>

          <button
            className="font-extrabold"
            type="button"
            onClick={() => {
              hideModal()
            }}
          >
            &#9587;
          </button>
        </div>
      </div>
    </div>
  )
}
