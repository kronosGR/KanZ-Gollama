import { IMessage } from '@renderer/interfaces/IMessage'
import { create } from 'zustand'

interface ChatState {
  isWorking: boolean
  messages: IMessage[]
  currentMessage: IMessage | null
  setIsWorking: (state: boolean) => void
  getMessages: () => IMessage[]
  setCurrentMessage: (message: IMessage) => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  isWorking: false,
  messages: [],
  currentMessage: null,
  setIsWorking: (state: boolean): void => set({ isWorking: state }),
  getMessages: (): IMessage[] => {
    return get().messages
  },
  setCurrentMessage: (message: IMessage): void => {
    set((state) => {
      const updatedMessages = [...state.messages, message]
      console.log(updatedMessages)
      return {
        currentMessage: message,
        messages: updatedMessages
      }
    })
  }
}))
