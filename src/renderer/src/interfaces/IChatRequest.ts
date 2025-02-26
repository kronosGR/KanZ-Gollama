import { IMessage } from './IMessage'

export interface IChatRequest {
  model: string
  messages?: IMessage[]
  stream?: boolean
  format?: string | object
  keep_alive?: string | number
  prompt?: string
}
