import { IMessage } from './IMessage'

export interface IConversation {
  name: string
  messages?: IMessage[]
  model: string
}
