'use client'

import { createContext, PropsWithChildren, ReactNode, useEffect, useState } from 'react'

const popups = {
  callPopup: CallPopup,
  quizPopup: QuizPopup,
  mapPopup: MapPopup,
} as const

interface PopupContextObject {
  openPopup: (name: keyof typeof popups) => void
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
  return <div className={`bg-base-600/60`}>{activePopup}</div>
}

export function PopupProvider({ children }: PropsWithChildren) {
  const [popup, setPopup] = useState<ReactNode | null>(null)

  function openPopup(name: keyof typeof popups) {
    setPopup(popups[name])
  }

  return (
    <>
      <PopupContext.Provider value={{ openPopup }}>
        {popup && <Popup activePopup={popup} />}
        {children}
      </PopupContext.Provider>
    </>
  )
}

function CallPopup() {
  return <div className={`text-base-100`}>call popup</div>
}

function QuizPopup() {
  return <>quiz popup</>
}

function MapPopup() {
  return <>map popup</>
}
