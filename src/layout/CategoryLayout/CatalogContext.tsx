'use client'

import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react'

type ViewContextType = {
  view: 'tile' | 'list'
  setView: Dispatch<SetStateAction<'tile' | 'list'>>
}

export const CatalogContext = createContext<ViewContextType>({} as ViewContextType)

export function CatalogProvider({ children }: PropsWithChildren) {
  const [view, setView] = useState<'tile' | 'list'>('tile')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = matchMedia('max-width: 768px').matches
    setView(isMobile ? 'list' : 'tile')
  }, [])

  return <CatalogContext.Provider value={{ view, setView }}>{children}</CatalogContext.Provider>
}
