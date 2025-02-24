import { MODALS, useModalsContext } from '@renderer/contexts/Modals'
import React, { ReactNode, useEffect } from 'react'

export const Statistics: React.FC = (): ReactNode => {
  const { getInfoModal, hideModal } = useModalsContext()
  const { title, message, type } = getInfoModal(MODALS.NOTIFICATION_MODAL).modalProps

  useEffect(() => {
    const timer = setTimeout(() => {
      hideModal(MODALS.NOTIFICATION_MODAL, title || '')
    }, 2000)
    return (): void => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`z-[1000] absolute border bottom-1 w-2/6 mb-1 ms-1 p-1 text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-700'} `}
    >
      <div className="border-b-2">{title}</div>
      <div>{message}</div>
    </div>
  )
}
