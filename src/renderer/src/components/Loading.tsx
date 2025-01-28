import { useModalsContext } from '@renderer/contexts/Modals'
import React, { CSSProperties, ReactNode } from 'react'
import { BounceLoader } from 'react-spinners'

const loadingCSS: CSSProperties = {
  position: 'absolute',
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
}

export const Loading = (): ReactNode => {
  const { store } = useModalsContext()
  const { modalProps } = store || {}
  const { title } = modalProps || {}

  return (
    <div className="flex h-svh w-svw absolute justify-center items-center">
      <BounceLoader
        color="blue"
        loading={true}
        cssOverride={loadingCSS}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className="text-red-600">{title}</div>
    </div>
  )
}
