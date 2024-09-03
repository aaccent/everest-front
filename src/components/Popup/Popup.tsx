'use client'

import React, { createContext, PropsWithChildren, useRef, useState } from 'react'
import CallPopup from '@/components/Popup/CallPopup/CallPopup'
import MapPopup from '@/components/Popup/MapPopup'
import { hideScroll, showScroll } from '@/features/scroll'
import FilterPopup from '@/components/Popup/FilterPopup/FilterPopup'

const popups = {
  callPopup: CallPopup,
  mapPopup: MapPopup,
  filterPopup: FilterPopup,
} as const

type PopupName = keyof typeof popups
type PopupArgs<TPopup extends PopupName> = Parameters<(typeof popups)[TPopup]>[0]

type PopupObj<TPopup extends PopupName> = {
  name: TPopup | null
  args?: PopupArgs<TPopup>
} & PopupArgs<TPopup> extends undefined
  ? {
      name: TPopup | null
      args?: never
    }
  : {
      name: TPopup | null
      args?: PopupArgs<TPopup>
    }

type PopupContextObject = {
  openPopup: <TPopup extends PopupName>(obj: PopupObj<TPopup>) => void
  closePopup: () => void
}

export const PopupContext = createContext({} as PopupContextObject)

interface PopupProps {
  stateRef: React.MutableRefObject<React.Dispatch<React.SetStateAction<PopupObj<PopupName>>> | undefined>
}

function Popup({ stateRef }: PopupProps) {
  const [popupObj, setPopupObj] = useState<PopupObj<PopupName>>({ name: null, args: undefined })

  stateRef.current = setPopupObj
  if (!popupObj.name) return null

  const _Popup = popups[popupObj.name]

  return (
    <div className='fixed inset-0 z-50 overflow-auto bg-base-600/60'>
      {/*@ts-ignore*/}
      <_Popup {...(popupObj.args || {})} />
    </div>
  )
}

export function PopupProvider({ children }: PropsWithChildren) {
  const stateRef = useRef<React.Dispatch<React.SetStateAction<PopupObj<PopupName>>>>()

  const openPopup: PopupContextObject['openPopup'] = (obj) => {
    if (!stateRef.current) return
    stateRef.current({ name: obj.name, args: obj.args })
    hideScroll()
  }

  const closePopup: PopupContextObject['closePopup'] = () => {
    if (!stateRef.current) return
    stateRef.current({ name: null, args: undefined })
    showScroll()
  }

  return (
    <PopupContext.Provider
      value={{
        openPopup,
        closePopup,
      }}
    >
      <Popup stateRef={stateRef} />
      {children}
    </PopupContext.Provider>
  )
}
