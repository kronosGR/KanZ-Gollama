import { IApiModel } from '@renderer/interfaces/IApiModel'
import { IModel } from '@renderer/interfaces/IModel'
import { MODELS_GET_URL } from '@renderer/utils/constants'
import { fetchUrl } from '@renderer/utils/fetchUrl'
import { normalizeModel } from '@renderer/utils/normalizeModel'
import { create } from 'zustand'

interface ModelState {
  isDownloading: boolean
  models: IModel[]
  modelName: string
  getModels: () => Promise<void>
  isModelExists: (name: string) => boolean
  setIsDownloading: (isDownloading: boolean) => void
  setModelName: (name: string) => void
}

export const useModelStore = create<ModelState>((set) => ({
  models: [],
  modelName: '',
  isDownloading: false,
  getModels: async (): Promise<void> => {
    const json = (await fetchUrl(MODELS_GET_URL, {})) as IApiModel | string

    const modelsData: IModel[] = (json['models'] as IApiModel[]).map((model: IApiModel) =>
      normalizeModel(model)
    )

    set({ models: modelsData })
  },
  isModelExists: (name: string): boolean => {
    return useModelStore.getState().models.some((model: IModel) => model.name === name)
  },
  setIsDownloading: (isDownloading: boolean): void => set({ isDownloading }),
  setModelName: (name: string): void => set({ modelName: name })
}))
