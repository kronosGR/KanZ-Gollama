import { Loading } from '@renderer/components/Loading'
import { ModelSearch } from '@renderer/components/ModelSearch'
import { ModelSettings } from '@renderer/components/ModelSettings'
import { Notification } from '@renderer/components/Notification'
import { Statistics } from '@renderer/components/Statistics'
import { IMessage } from '@renderer/interfaces/IMessage'
import React, { createContext, ReactNode, useContext, useState } from 'react'

export const MODALS = {
  MODEL_SETTINGS_MODAL: 'MODEL_SETTINGS_MODAL',
  MODEL_SEARCH: 'MODEL_SEARCH',
  LOADING_MODAL: 'LOADING_MODAL',
  NOTIFICATION_MODAL: 'NOTIFICATION_MODAL',
  STATISTICS_MODAL: 'STATISTICS_MODAL'
}

const MODAL_COMPONENTS = {
  [MODALS.MODEL_SETTINGS_MODAL]: ModelSettings,
  [MODALS.MODEL_SEARCH]: ModelSearch,
  [MODALS.LOADING_MODAL]: Loading,
  [MODALS.NOTIFICATION_MODAL]: Notification,
  [MODALS.STATISTICS_MODAL]: Statistics
}

interface ModalProps {
  title?: string
  content?: ReactNode
  message?: string
  type?: string
  x?: number
  y?: number
  msg?: IMessage
}

interface Modal {
  modalType: string | null
  modalProps: ModalProps
}

interface ModalStore {
  modals: Modal[]
}

interface ContextType {
  showModal: (modalType: string, modalProps: ModalProps) => void
  hideModal: (modalType: string, title: string) => void
  getInfoModal: (modalType: string) => { modalType: string; modalProps: ModalProps }
  store: ModalStore | null
}

const initialState: ContextType = {
  showModal: () => '',
  hideModal: () => {},
  getInfoModal: () => ({ modalType: '', modalProps: {} }),
  store: null
}

const ModalsContext = createContext<ContextType>(initialState)
export const useModalsContext = (): ContextType => useContext(ModalsContext)

export const Modals: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [store, setStore] = useState<ModalStore>({ modals: [] })
  const modals = store?.modals

  const showModal = (modalType: string, modalProps: ModalProps): void => {
    const newModal = { modalType, modalProps }
    setStore((prev) => ({
      ...prev,
      modals: [...prev.modals, newModal]
    }))
  }

  const hideModal = (modalType: string, title: string): void => {
    setStore((prev) => ({
      ...prev,
      modals: prev.modals.filter(
        (modal) => modal.modalType !== modalType || modal.modalProps.title !== title
      )
    }))
  }

  const getInfoModal = (modalType: string): Modal => {
    const tmpModal = modals.find((modal) => modal.modalType === modalType)
    return tmpModal || { modalType: '', modalProps: {} }
  }

  const showModals = (): ReactNode => {
    if (!modals?.length) return null
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
