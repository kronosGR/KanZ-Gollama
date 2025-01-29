import { IApiModel } from '@renderer/interfaces/IApiModel'
import { IModel } from '@renderer/interfaces/IModel'

export const normalizeModel = (model: IApiModel): IModel => {
  const modelTmp: IModel = {
    name: model.name,
    model: model.model,
    size: +model.size,
    family: model.details?.family,
    format: model.details?.format,
    parameterSize: model.details?.parameter_size,
    parameterModel: model.details?.parameter_model,
    quantizationLevel: model.details?.quantization_level
  }

  return modelTmp
}
