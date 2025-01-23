export interface IApiModel {
  name: string
  model: string
  size: string
  details?: {
    family?: string
    format?: string
    parameter_size?: string
    parameter_model?: string
    quantization_level?: string
  }
}
