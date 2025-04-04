import { IConversation } from '@renderer/interfaces/IConversation'
import { IMessage } from '@renderer/interfaces/IMessage'
import { create } from 'zustand'

interface ChatState {
  isWorking: boolean
  messages: IMessage[]
  currentMessage: IMessage | null
  stats: boolean
  aIType: string
  currentConversation: IConversation
  conversations: IConversation[]
  setIsWorking: (state: boolean) => void
  getMessages: () => IMessage[]
  getAIMessages: () => IMessage[]
  getUserMessages: () => IMessage[]
  setCurrentMessage: (message: IMessage, isDone: boolean) => void
  resetCurrentMessage: () => void
  setMessage: (message: IMessage) => void
  setStats: (status: boolean) => void
  setCurrentConversation: (conversation: IConversation) => void
  setConversations: (conversations: IConversation[]) => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  isWorking: false,
  messages: [],
  currentMessage: null,
  stats: false,
  aIType: 'generate',
  currentConversation: { name: 'Default', messages: [], model: '' },
  conversations: [{ name: 'Default', messages: [], model: '' }],
  setIsWorking: (state: boolean): void => set({ isWorking: state }),
  getMessages: (): IMessage[] => {
    return get().messages
  },
  getAIMessages: (): IMessage[] => {
    return get().messages.filter((message: IMessage) => message.role === 'assistant')
  },
  getUserMessages: (): IMessage[] => {
    return [
      ...get().messages.filter((message: IMessage) => message.role === 'user'),
      { role: 'user', content: '' }
    ]
  },
  resetCurrentMessage: (): void => set({ currentMessage: null }),
  setCurrentMessage: (message: IMessage | null, isDone: boolean): void => {
    set({ currentMessage: null })
    set({ currentMessage: message })
    if (isDone) {
      set((state) => {
        const updatedMessages = [...state.messages, state.currentMessage]
        set({ currentMessage: null })
        set({ isWorking: true })
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
  },
  setStats: (status: boolean): void => {
    set({ stats: status })
  },
  setAiType: (type: string): void => {
    set({ aIType: type })
  },
  setConversations: (conversations: IConversation[]): void => {
    set({ conversations })
  },
  setCurrentConversation: (conversation: IConversation): void => {
    set({ currentConversation: conversation })
  }
}))
