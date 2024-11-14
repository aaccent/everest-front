'use client'

import React, { createContext, PropsWithChildren, useState } from 'react'
import CallPopup from '@/ui/popups/CallPopup/CallPopup'
import MapPopup from '@/ui/popups/MapPopup'
import { hideScroll, showScroll } from '@/features/scroll'
import GalleryPopup from '@/ui/popups/GalleryPopup/GalleryPopup'
import FilterPopup from '@/ui/popups/FilterPopup/FilterPopup'
import ThxPopup from '@/ui/popups/ThxPopup'
import MapObjectsPopup from '@/ui/popups/MapObjectsPopup'
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
  popup: PopupName | null
  updateProps: <TPopup extends PopupName>(popupName: TPopup, args: PopupObj<TPopup>['args']) => void
}

export const PopupContext = createContext({} as PopupContextObject)

export function PopupProvider({ children }: PropsWithChildren) {
  const [props, setProps] = useState<object | null>(null)
  const [popupName, setPopupName] = useState<PopupName | null>(null)

  function openPopup(obj: any) {
    setPopupName(obj.name)
    setProps(obj.args || null)
    hideScroll()
  }

  const closePopup: PopupContextObject['closePopup'] = () => {
    setPopupName(null)
    setProps(null)
    showScroll()
  }

  function updateProps(_popupName: PopupName, args: any) {
    if (_popupName !== popupName) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Вы пытаетесь поменять параметры попапа, который не открыт')
      }
      return
    }

    setProps((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(args)) return prev
      return args
    })
  }

  const ActivePopup = popupName ? popups[popupName] : () => null

  return (
    <PopupContext.Provider
      value={{
        updateProps,
        popup: popupName,
        openPopup,
        closePopup,
      }}
    >
      <ActivePopup {...((props || {}) as any)} />
      {children}
    </PopupContext.Provider>
  )
}
