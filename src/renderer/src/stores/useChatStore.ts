import { IMessage } from '@renderer/interfaces/IMessage'
import { create } from 'zustand'

interface ChatState {
  isWorking: boolean
  messages: IMessage[]
  currentMessage: IMessage | null
  setIsWorking: (state: boolean) => void
  getMessages: () => IMessage[]
  setCurrentMessage: (message: IMessage, isDone: boolean) => void
  setMessage: (message: IMessage) => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  isWorking: false,
  messages: [],
  currentMessage: null,
  setIsWorking: (state: boolean): void => set({ isWorking: state }),
  getMessages: (): IMessage[] => {
    return get().messages
  },
  setCurrentMessage: (message: IMessage, isDone: boolean): void => {
    set({ currentMessage: null })
    set({ currentMessage: message })
    if (isDone) {
      set((state) => {
        const updatedMessages = [...state.messages, state.currentMessage]
        // console.log(updatedMessages)
        return {
          messages: updatedMessages
        }
      })
    }
  },
  setMessage: (message: IMessage): void => {
    set((state) => {
      const updatedMessages = [...state.messages, message]
      return {
        messages: updatedMessages
      }
    })
  }
}))
