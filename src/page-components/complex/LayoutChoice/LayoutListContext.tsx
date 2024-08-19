'use client'

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
import { LayoutObject } from '@/types/Complex'

interface LayoutContextObject {
  activeObject: LayoutObject | null | undefined
  setActiveObject: Dispatch<SetStateAction<LayoutObject | null | undefined>>
}

export const LayoutContext = createContext({} as LayoutContextObject)

export function LayoutContextProvider({ children }: PropsWithChildren) {
  const [activeObject, setActiveObject] = useState<LayoutObject | null | undefined>(null)
  return (
    <LayoutContext.Provider value={{ activeObject: activeObject, setActiveObject: setActiveObject }}>
      {children}
    </LayoutContext.Provider>
  )
}
