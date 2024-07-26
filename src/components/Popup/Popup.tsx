'use client'

import React, { createContext, PropsWithChildren, useContext, useState } from 'react'
import CallPopup from '@/components/Popup/CallPopup/CallPopup'
import MapPopup from '@/components/Popup/MapPopup'
import { createPortal } from 'react-dom'

const popups = {
  callPopup: CallPopup,
  mapPopup: MapPopup,
}

type E = React.JSX.Element | Promise<React.JSX.Element>
type N = keyof typeof popups

type PopupContextObject = {
  openPopup: (name: keyof typeof popups) => void
  closePopup: () => void
  activePopup?: E
}

export const PopupContext = createContext({} as PopupContextObject)

function PopupWrapper() {
  const { activePopup } = useContext(PopupContext)
  return activePopup && <div className='fixed inset-0 z-50 bg-base-600/60'>{activePopup}</div>
}

export function PopupProvider({ children }: PropsWithChildren) {
  const [popup, setPopup] = useState<E | undefined>()

  function openPopup(name: N) {
    document.body.style.height = '100lvh'
    document.body.style.overflow = 'hidden'

    setPopup(popups[name])
  }

  function closePopup() {
    setPopup(undefined)
    document.body.style.height = 'fit-content'
    document.body.style.overflow = 'clip'
  }

  return (
    <PopupContext.Provider value={{ openPopup, closePopup, activePopup: popup }}>
      {popup ? createPortal(<PopupWrapper />, document.body) : null}
      {children}
    </PopupContext.Provider>
  )
}
