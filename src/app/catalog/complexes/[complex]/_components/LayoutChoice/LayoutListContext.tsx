'use client'

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
import { ComplexHouseObject } from '@/types/complex/ComplexHouse'

interface LayoutContextObject {
  activeObject: ComplexHouseObject | null | undefined
  setActiveObject: Dispatch<SetStateAction<ComplexHouseObject | null>>
}

export const LayoutContext = createContext({} as LayoutContextObject)

export function LayoutContextProvider({ children }: PropsWithChildren) {
  const [activeObject, setActiveObject] = useState<ComplexHouseObject | null>(null)
  return (
    <LayoutContext.Provider value={{ activeObject: activeObject, setActiveObject: setActiveObject }}>
      {children}
    </LayoutContext.Provider>
  )
}
