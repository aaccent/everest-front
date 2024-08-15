'use client'

import React, { createContext, PropsWithChildren, useState } from 'react'
import CallPopup from '@/components/Popup/CallPopup/CallPopup'
import MapPopup from '@/components/Popup/MapPopup'
import { hideScroll, showScroll } from '@/features/scroll'
import FilterPopup from '@/components/Popup/FilterPopup/FilterPopup'

const popups = {
  callPopup: CallPopup,
  mapPopup: MapPopup,
  filterPopup: FilterPopup,
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

export function PopupProvider({ children }: PropsWithChildren) {
  const [popup, setPopup] = useState<PopupElement | null>()

  function openPopup(name: PopupName) {
    hideScroll()
    setPopup(popups[name])
  }

  function closePopup() {
    setPopup(null)
    showScroll()
  }

  return <PopupContext.Provider value={{ openPopup, closePopup, activePopup: popup }}>{children}</PopupContext.Provider>
}
