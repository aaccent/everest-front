'use client'

import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Props as CategoryObjectsHookProps, useCategoryObjects } from '@/features/catalog/useCategoryObject'
import { ComplexObject, LayoutObject } from '@/types/catalog/Complex'
import { DefaultObject } from '@/types/catalog/DefaultObject'
type ViewType = 'tile' | 'list'

type CategoryContextObject = {
  view: ViewType
  setView: Dispatch<SetStateAction<ViewType>>
  list: unknown[]
  isLoading: boolean
  amount: number
}

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
  const [view, setView] = useState<ViewType>('tile')
  const { list, isLoading } = useCategoryObjects<unknown>({ initList, getObjects })
  const [amount, setAmount] = useState<number>(list.length)

  useEffect(() => {
    setAmount(list.length)
  }, [list])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = matchMedia('max-width: 768px').matches
    setView(isMobile ? 'list' : 'tile')
  }, [])

  return (
    <CategoryContext.Provider value={{ view, setView, list, isLoading, amount }}>{children}</CategoryContext.Provider>
  )
}
