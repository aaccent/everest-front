'use client'

import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import CallPopup from '@/ui/popups/CallPopup/CallPopup'
import MapPopup from '@/ui/popups/MapPopup'
import { hideScroll, showScroll } from '@/features/scroll'
import GalleryPopup from '@/ui/popups/GalleryPopup/GalleryPopup'
import FilterPopup from '@/ui/popups/FilterPopup/FilterPopup'
import ThxPopup from '@/ui/popups/ThxPopup'
import MapObjectsPopup from '@/ui/popups/MapObjectsPopup'
import { createPortal } from 'react-dom'
import GeoPopup from '@/ui/popups/GeoPopup/GeoPopup'

const popups = {
  callPopup: CallPopup,
  mapPopup: MapPopup,
  filterPopup: FilterPopup,
  galleryPopup: GalleryPopup,
  thxPopup: ThxPopup,
  mapObject: MapObjectsPopup,
  geoPopup: GeoPopup,
} as const

type PopupName = keyof typeof popups
type PopupArgs<TPopup extends PopupName> = Parameters<(typeof popups)[TPopup]>[0]

type PopupObj<TPopup extends PopupName> = {
  name: TPopup
  args?: PopupArgs<TPopup>
} & PopupArgs<TPopup> extends undefined
  ? {
      name: TPopup
      args?: never
    }
  : {
      name: TPopup
      args?: PopupArgs<TPopup>
    }

type PopupContextObject = {
  openPopup: <TPopup extends PopupName>(obj: PopupObj<TPopup>) => void
  closePopup: () => void
  openDynamicPopup: (popupName: PopupName) => void
  activeDynamicPopup: PopupName | null
  popupObj: PopupObj<PopupName> | null
}

export const PopupContext = createContext({} as PopupContextObject)

interface PopupProps {
  popup: PopupObj<PopupName>
}

function Popup() {
  const { activeDynamicPopup, popupObj } = useContext(PopupContext)
  const [name, setName] = useState<PopupName | null>(null)
  useEffect(() => {
    setName(popupObj?.name ?? activeDynamicPopup)
  }, [activeDynamicPopup, popupObj])

  if (!name) return null
  const _Popup = popups[name]

  return (
    <div className='fixed inset-0 z-50 bg-base-600/60'>
      {/*@ts-ignore*/}
      <_Popup {...(popupObj?.args ?? {})} />
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
  const [popupObj, setPopupObj] = useState<PopupObj<PopupName> | null>(null)
  //const stateRef = useRef<React.Dispatch<React.SetStateAction<PopupObj<PopupName>>>>()
  const [activeDynamicPopup, setActiveDynamicPopup] = useState<PopupName | null>(null)

  const openPopup: PopupContextObject['openPopup'] = (obj) => {
    setPopupObj({ name: obj.name, args: obj.args })
    hideScroll()
  }

  const openDynamicPopup: PopupContextObject['openDynamicPopup'] = (name) => {
    setActiveDynamicPopup(name)
    hideScroll()
  }

  const closePopup: PopupContextObject['closePopup'] = () => {
    setActiveDynamicPopup(null)
    setPopupObj(null)
    showScroll()
  }

  return (
    <PopupContext.Provider
      value={{
        openPopup,
        closePopup,
        openDynamicPopup,
        activeDynamicPopup,
        popupObj,
      }}
    >
      <Popup />
      {children}
    </PopupContext.Provider>
  )
}
