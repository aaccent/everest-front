'use client'

import React, { createContext, PropsWithChildren, useContext, useState } from 'react'
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

type PopupName = keyof typeof popups

type PopupContextObject = {
  openPopup: (name: keyof typeof popups) => void
  closePopup: () => void
  activePopupName: PopupName | null
}

export const PopupContext = createContext({} as PopupContextObject)

function PopupWrapper({ children }: PropsWithChildren) {
  const { activePopupName } = useContext(PopupContext)
  return activePopupName && <div className='fixed inset-0 z-50 overflow-auto bg-base-600/60'>{children}</div>
}

export function PopupProvider({ children }: PropsWithChildren) {
  const [popup, setPopup] = useState<PopupName | null>(null)

  function openPopup(name: PopupName) {
    hideScroll()
    setPopup(name)
  }

  function closePopup() {
    setPopup(null)
    showScroll()
  }

  const Popup = popup ? popups[popup] : () => null

  return (
    <PopupContext.Provider
      value={{
        openPopup,
        closePopup,
        activePopupName: popup,
      }}
    >
      <PopupWrapper>
        <Popup />
      </PopupWrapper>
      {children}
    </PopupContext.Provider>
  )
}
