import { IApiModel } from '@renderer/interfaces/IApiModel'
import { IModel } from '@renderer/interfaces/IModel'
import { MODELS_GET_URL } from '@renderer/utils/constants'
import { fetchUrl } from '@renderer/utils/fetchUrl'
import { normalizeModel } from '@renderer/utils/normalizeModel'
import { create } from 'zustand'

interface ModelState {
  models: IModel[]
  getModels: () => Promise<void>
}

export const useModelStore = create<ModelState>((set) => ({
  models: [],
  getModels: async (): Promise<void> => {
    const json = (await fetchUrl(MODELS_GET_URL, {})) as IApiModel | string

    const modelsData: IModel[] = (json['models'] as IApiModel[]).map((model: IApiModel) =>
      normalizeModel(model)
    )

    set({ models: modelsData })
  }
}))
