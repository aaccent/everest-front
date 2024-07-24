'use client'

import { createContext, PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import CallPopup from '@/components/Popup/CallPopup'
import QuizPopup from '@/components/Popup/QuizPopup'
import MapPopup from '@/components/Popup/MapPopup'

const popups = {
  callPopup: CallPopup,
  quizPopup: QuizPopup,
  mapPopup: MapPopup,
} as const

interface PopupContextObject {
  openPopup: (name: keyof typeof popups) => void
  closePopup: () => void
}

export const PopupContext = createContext<PopupContextObject>({} as PopupContextObject)

interface PopupProps {
  activePopup: ReactNode
}

function Popup({ activePopup }: PopupProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100lvh'
  }, [])
  return <div className={`fixed inset-0 z-50 bg-base-600/60`}>{activePopup}</div>
}

export function PopupProvider({ children }: PropsWithChildren) {
  const [popup, setPopup] = useState<ReactNode | null>(null)

  function openPopup(name: keyof typeof popups) {
    setPopup(popups[name])
  }

  function closePopup() {
    setPopup(null)
  }

  return (
    <>
      <PopupContext.Provider value={{ openPopup, closePopup }}>
        {popup && <Popup activePopup={popup} />}
        {children}
      </PopupContext.Provider>
    </>
  )
}
