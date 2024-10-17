'use client'

import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  ObjectManagerType,
  Props as CategoryObjectsHookProps,
  useCategoryObjects,
} from '@/features/catalog/useFilterAndPagination'
import { ComplexObject, LayoutObject } from '@/types/catalog/Complex'
import { DefaultObject } from '@/types/catalog/DefaultObject'

export const PER_PAGE = {
  MOBILE: 5,
  LIST: 3,
  TILE: 9,
}

type View = 'tile' | 'list'

type CategoryContextObject = {
  view: View
  setView: Dispatch<SetStateAction<View>>
} & ObjectManagerType

export const CategoryContext = createContext<CategoryContextObject>({} as CategoryContextObject)

type CategoryProviderProps = {
  children: React.ReactNode
} & (
  | ({
      type: 'complex'
    } & CategoryObjectsHookProps<ComplexObject>)
  | ({
      type: 'default'
    } & CategoryObjectsHookProps<DefaultObject>)
  | ({
      type: 'layout'
    } & CategoryObjectsHookProps<LayoutObject>)
)

export function CategoryProvider({ children, initList, getObjects }: CategoryProviderProps) {
  const objectsManager = useCategoryObjects<unknown>({ initList, getObjects })

  const [view, setView] = useState<View>('tile')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = matchMedia('max-width: 768px').matches
    setView(isMobile ? 'tile' : view)
  }, [])

  return <CategoryContext.Provider value={{ view, setView, ...objectsManager }}>{children}</CategoryContext.Provider>
}
