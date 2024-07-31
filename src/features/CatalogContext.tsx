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

interface ViewComponentProps<TItem extends { id: number }> {
  item: TItem
}

type ViewComponent<TItem extends { id: number }> = (props: ViewComponentProps<TItem>) => React.ReactNode

export function viewFunctions<
  TItem extends {
    id: number
  },
>(list: TItem[], ListViewComponent: ViewComponent<TItem>, TileViewComponent: ViewComponent<TItem>) {
  function tileView() {
    return list.map((item) => <TileViewComponent item={item} key={item.id} />)
  }

  function listView() {
    return list.map((item) => <ListViewComponent item={item} key={item.id} />)
  }

  return { listView: listView(), tileView: tileView() }
}
