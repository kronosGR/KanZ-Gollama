import { Loading } from '@renderer/components/Loading'
import { ModelSettings } from '@renderer/components/ModelSettings'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export const MODALS = {
  MODEL_SETTINGS_MODAL: 'MODEL_SETTINGS_MODAL',
  LOADING_MODAL: 'LOADING_MODAL'
}

const MODAL_COMPONENTS = {
  [MODALS.MODEL_SETTINGS_MODAL]: ModelSettings,
  [MODALS.LOADING_MODAL]: Loading
}

interface ModalProps {
  title?: string
  content?: ReactNode
}

interface Modal {
  modalType: string | null
  modalProps: ModalProps
}

interface ModalStore {
  modals: Modal[]
}

type ContextType = {
  showModal: (modalType: string, modalProps: ModalProps) => void
  hideModal: (modalType: string) => void
  getInfoModal: (modalType: string) => { modalType: string; modalProps: ModalProps }
  store: ModalStore
}

const initialStateStore: ModalStore = {
  modals: [
    {
      modalType: null,
      modalProps: {}
    }
  ]
}

const initialState: ContextType = {
  showModal: () => {},
  hideModal: () => {},
  getInfoModal: (modalType: string) => ({ modalType, modalProps: {} }),
  store: initialStateStore
}

const ModalsContext = createContext<ContextType>(initialState)
export const useModalsContext = (): ContextType => useContext(ModalsContext)

export const Modals: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [store, setStore] = useState(initialStateStore)
  const modals = store.modals

  // useEffect(() => {
  //   console.log(store)
  // }, [store])

  const showModal = (modalType: string, modalProps: ModalProps): void => {
    setStore({
      ...store,
      modals: [
        {
          modalType,
          modalProps
        }
      ]
    })
  }

  const hideModal = (modalType: string): void => {
    if (!modalType) return
    const newModals = store.modals.filter((modal) => modal.modalType !== modalType)
    setStore({
      ...store,
      modals: newModals
    })
  }

  const getInfoModal = (modalType: string): Modal => {
    if (!modalType) return { modalType, modalProps: {} }
    const tmpModal = store.modals.filter((modal) => modal.modalType === modalType)
    return tmpModal[0]
  }

  const showModals = (): ReactNode => {
    if (modals.length === 0) return null
    return (
      <>
        {modals.map((modal, index) => {
          const ModalTmpComp = MODAL_COMPONENTS[modal.modalType as string]
          if (!ModalTmpComp) return null
          return <ModalTmpComp key={index} {...modal.modalProps} />
        })}
      </>
    )
  }

  return (
    <ModalsContext.Provider value={{ store, showModal, hideModal, getInfoModal }}>
      {showModals()}
      {children}
    </ModalsContext.Provider>
  )
}
