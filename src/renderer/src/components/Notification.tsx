import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import React, { ReactNode, useEffect } from 'react'

export const Notification: React.FC = (): ReactNode => {
  const { getInfoModal, hideModal } = useModalsContext()
  const { title, message, type } = getInfoModal(MODALS.NOTIFICATION_MODAL).modalProps

  useEffect(() => {
    setTimeout(() => {
      hideModal(MODALS.NOTIFICATION_MODAL)
    }, 3000)
  }, [])

  return (
    <div
      className={`absolute border bottom-1 w-2/6 mb-1 ms-1 p-1 text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-700'} `}
    >
      <div className="border-b-2">{title}</div>
      <div>{message}</div>
    </div>
  )
}
