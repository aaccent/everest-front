'use client'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import { Sort } from '@/types/FiltersType'
import { useEffect, useRef, useState } from 'react'
import { useCategorySort } from '@/features/catalog/useCategorySort'

export type GetObjectsFn<TType = unknown> = (filter: object[] | null, sort: Sort['value'] | null) => Promise<TType[]>

export interface Props<TType = unknown> {
  initList: TType[]
  getObjects: GetObjectsFn<TType>
}

/**
 * Использует хуки {@link useCategoryFilter} и {@link useCategorySort} для контроля внутреннего состояния со списком объектов.
 * @param initList - Инициализирующий список объектов. Выводится пока не будет закончен запрос
 * @param getObjects - функция для запроса объектов
 */
export function useCategoryObjects<TType = unknown>({ initList, getObjects }: Props<TType>) {
  const [list, setList] = useState<unknown[]>(initList)
  const [isLoading, setIsLoading] = useState(false)
  const { filter } = useCategoryFilter()
  const { sort } = useCategorySort()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const updateState = async () => {
    setIsLoading(true)
    try {
      const data = await getObjects(filter.parsed || null, sort)
      setList(data)
    } catch {
      setList([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(updateState, 500)
  }, [sort, filter])

  return { list, isLoading }
}
