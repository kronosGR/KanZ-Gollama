import { Loading } from '@renderer/components/Loading'
import { ModelSettings } from '@renderer/components/ModelSettings'
import { Notification } from '@renderer/components/Notification'
import React, { createContext, ReactNode, useContext, useState } from 'react'

export const MODALS = {
  MODEL_SETTINGS_MODAL: 'MODEL_SETTINGS_MODAL',
  LOADING_MODAL: 'LOADING_MODAL',
  NOTIFICATION_MODAL: 'NOTIFICATION_MODAL'
}

const MODAL_COMPONENTS = {
  [MODALS.MODEL_SETTINGS_MODAL]: ModelSettings,
  [MODALS.LOADING_MODAL]: Loading,
  [MODALS.NOTIFICATION_MODAL]: Notification
}

interface ModalProps {
  title?: string
  content?: ReactNode
  message?: string
  type?: string
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
  hideModal: (modalType: string, title: string) => void
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
    const newModals = [
      ...store.modals,
      {
        modalType,
        modalProps
      }
    ]
    // console.log('---show', newModals)
    setStore({
      ...store,
      modals: newModals
    })
  }

  const hideModal = (modalType: string, title: string): void => {
    if (!modalType) return
    const newModals = store.modals.filter(
      (modal) => modal.modalType !== modalType && modal.modalProps.title !== title
    )
    // console.log('---hide', newModals)
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
