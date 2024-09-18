'use client'

import React, { createContext, PropsWithChildren, useContext, useState } from 'react'
import { hideScroll, showScroll } from '@/features/visible/scroll'
import { createPortal } from 'react-dom'

type PopupName = 'callPopup' | 'mapPopup' | 'filterPopup' | 'galleryPopup' | 'thxPopup'
type PopupContextObject = {
  openPopup: (popupName: PopupName) => void
  closePopup: () => void
  activePopup: PopupName | null
}

export const PopupContext = createContext({} as PopupContextObject)

interface PopupProps extends PropsWithChildren {
  popupName: PopupName
  isDynamic?: boolean
}

export function Popup({ popupName, children, isDynamic }: PopupProps) {
  const { activePopup } = useContext(PopupContext)

  if (popupName !== activePopup) return null

  return isDynamic ? (
    <div className='fixed inset-0 z-50 bg-base-600/60'>{children}</div>
  ) : (
    createPortal(<div className='fixed inset-0 z-50 bg-base-600/60'>{children}</div>, document.body)
  )
}

export function PopupProvider({ children }: PropsWithChildren) {
  const [activePopup, setActivePopup] = useState<PopupName | null>(null)

  const openPopup: PopupContextObject['openPopup'] = (name) => {
    setActivePopup(name)
    hideScroll()
  }

  const closePopup: PopupContextObject['closePopup'] = () => {
    setActivePopup(null)
    showScroll()
  }

  return (
    <PopupContext.Provider
      value={{
        openPopup,
        closePopup,
        activePopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  )
}
