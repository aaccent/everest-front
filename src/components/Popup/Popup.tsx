'use client'

import React, { createContext, PropsWithChildren, useContext, useState } from 'react'
import CallPopup from '@/components/Popup/CallPopup/CallPopup'
import MapPopup from '@/components/Popup/MapPopup'
import { hideScroll, showScroll } from '@/features/scroll'

const popups = {
  callPopup: CallPopup,
  mapPopup: MapPopup,
} satisfies {
  [index: string]: () => React.ReactNode
}

type PopupElement = React.ReactNode
type PopupName = keyof typeof popups

type PopupContextObject = {
  openPopup: (name: keyof typeof popups) => void
  closePopup: () => void
  activePopup?: PopupElement
}

export const PopupContext = createContext({} as PopupContextObject)

function PopupWrapper() {
  const { activePopup } = useContext(PopupContext)
  if (!activePopup) return null
  return <div className='fixed inset-0 z-50 bg-base-600/60'>{activePopup}</div>
}

export function PopupProvider({ children }: PropsWithChildren) {
  const [popup, setPopup] = useState<PopupElement | null>()

  function openPopup(name: PopupName) {
    hideScroll()
    setPopup(popups[name])
  }

  function closePopup() {
    setPopup(undefined)
    showScroll()
  }

  return (
    <PopupContext.Provider value={{ openPopup, closePopup, activePopup: popup }}>
      <PopupWrapper />
      {children}
    </PopupContext.Provider>
  )
}
