'use client'
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'

type ViewContextType = {
  view: 'tile' | 'list'
  setView: Dispatch<SetStateAction<'tile' | 'list'>>
}

export const ViewContext = createContext<ViewContextType>({} as ViewContextType)

export function ViewProvider({ children }: PropsWithChildren) {
  const [view, setView] = useState<'tile' | 'list'>('tile')
  return <ViewContext.Provider value={{ view, setView }}>{children}</ViewContext.Provider>
}
