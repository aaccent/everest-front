'use client'

import React, { createContext, PropsWithChildren, useContext, useRef, useState } from 'react'
import CallPopup from '@/ui/popups/CallPopup/CallPopup'
import MapPopup from '@/ui/popups/MapPopup'
import { hideScroll, showScroll } from '@/features/visible/scroll'
import GalleryPopup from '@/ui/popups/GalleryPopup/GalleryPopup'
import FilterPopup from '@/ui/popups/FilterPopup/FilterPopup'
import ThxPopup from '@/ui/popups/ThxPopup'
import { createPortal } from 'react-dom'

const popups = {
  callPopup: CallPopup,
  mapPopup: MapPopup,
  filterPopup: FilterPopup,
  galleryPopup: GalleryPopup,
  thxPopup: ThxPopup,
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
  openDynamicPopup: (popupName: PopupName) => void
  activeDynamicPopup: PopupName | null
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
    <div className='fixed inset-0 z-50 bg-base-600/60'>
      {/*@ts-ignore*/}
      <_Popup {...(popupObj.args || {})} />
    </div>
  )
}

interface DynamicPopupProps extends PropsWithChildren {
  popupName: PopupName
  isDynamic?: boolean
}

export function DynamicPopup({ popupName, children }: DynamicPopupProps) {
  const { activeDynamicPopup } = useContext(PopupContext)

  if (popupName !== activeDynamicPopup) return null

  return createPortal(<div className='fixed inset-0 z-50 bg-base-600/60'>{children}</div>, document.body)
}

interface PopupProviderProps extends PropsWithChildren {
  isDynamic?: boolean
}

export function PopupProvider({ children }: PopupProviderProps) {
  const stateRef = useRef<React.Dispatch<React.SetStateAction<PopupObj<PopupName>>>>()
  const [activeDynamicPopup, setActiveDynamicPopup] = useState<PopupName | null>(null)

  const openPopup: PopupContextObject['openPopup'] = (obj) => {
    if (!stateRef.current) return
    stateRef.current({ name: obj.name, args: obj.args })
    hideScroll()
  }

  const openDynamicPopup: PopupContextObject['openDynamicPopup'] = (name) => {
    setActiveDynamicPopup(name)
    hideScroll()
  }

  const closePopup: PopupContextObject['closePopup'] = () => {
    setActiveDynamicPopup(null)
    if (!stateRef.current) return
    stateRef.current({ name: null, args: undefined })
    showScroll()
  }

  return (
    <PopupContext.Provider
      value={{
        openPopup,
        closePopup,
        openDynamicPopup,
        activeDynamicPopup,
      }}
    >
      <Popup stateRef={stateRef} />
      {children}
    </PopupContext.Provider>
  )
}
