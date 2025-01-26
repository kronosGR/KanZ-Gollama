import { ModelSettings } from '@renderer/components/ModelSettings'
import React, { createContext, ReactNode, useContext, useState } from 'react'

export const MODALS = {
  MODEL_SETTINGS_MODAL: 'MODEL_SETTINGS_MODAL'
}

const MODAL_COMPONENTS = {
  [MODALS.MODEL_SETTINGS_MODAL]: ModelSettings
}

interface ModalProps {
  title?: string
  content?: ReactNode
}

interface ModalStore {
  modalType: string | null
  modalProps: ModalProps
}

type ContextType = {
  showModal: (modalType: string, modalProps: ModalProps) => void
  hideModal: () => void
  store: ModalStore
}

const initialStateStore: ModalStore = {
  modalType: null,
  modalProps: {}
}

const initialState: ContextType = {
  showModal: () => {},
  hideModal: () => {},
  store: initialStateStore
}

const ModalsContext = createContext<ContextType>(initialState)
export const useModalsContext = (): ContextType => useContext(ModalsContext)

export const Modals: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [store, setStore] = useState(initialStateStore)
  const { modalType, modalProps } = store

  const showModal = (modalType: string, modalProps: ModalProps): void => {
    setStore({
      ...store,
      modalType,
      modalProps
    })
  }

  const hideModal = (): void => {
    setStore({
      ...store,
      modalType: null,
      modalProps: {}
    })
  }

  const showModals = (): ReactNode => {
    if (!modalType) return null
    const ModalTmpComp = MODAL_COMPONENTS[modalType]
    if (!modalType || !ModalTmpComp) return null
    return <ModalTmpComp id="modal" {...modalProps} />
  }

  return (
    <ModalsContext.Provider value={{ store, showModal, hideModal }}>
      {showModals()}
      {children}
    </ModalsContext.Provider>
  )
}
