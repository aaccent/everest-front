'use client'

import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import {
  ObjectManagerType,
  Props as CategoryObjectsHookProps,
  useFilterAndPagination,
} from '@/features/useFilterAndPagination'
import { ComplexObject } from '@/types/catalog/Complex'
import { DefaultObject } from '@/types/catalog/DefaultObject'

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
    } & CategoryObjectsHookProps<DefaultObject>)
)

export function CategoryProvider({ children, initList, getObjects }: CategoryProviderProps) {
  const objectsManager = useFilterAndPagination<unknown>({ initList, getObjects })

  const [view, setView] = useState<View>('tile')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = matchMedia('max-width: 768px').matches
    setView(isMobile ? 'tile' : view)
  }, [])

  return <CategoryContext.Provider value={{ view, setView, ...objectsManager }}>{children}</CategoryContext.Provider>
}
