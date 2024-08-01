'use client'

import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from 'react'

type ViewType = 'tile' | 'list'

type CategoryContextObject = {
  view: ViewType
  setView: Dispatch<SetStateAction<ViewType>>
}

export const CategoryContext = createContext<CategoryContextObject>({} as CategoryContextObject)

export function CategoryProvider({ children }: PropsWithChildren) {
  const [view, setView] = useState<ViewType>('tile')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = matchMedia('max-width: 768px').matches
    setView(isMobile ? 'list' : 'tile')
  }, [])

  return <CategoryContext.Provider value={{ view, setView }}>{children}</CategoryContext.Provider>
}
