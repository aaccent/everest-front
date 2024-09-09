'use client'
import { useCategoryFilter } from '@/features/useCategoryFilter'
import { Sort } from '@/types/FiltersType'
import { useEffect, useState } from 'react'
import { useCategorySort } from '@/features/useCategorySort'

export interface Props<TType = unknown> {
  initList: TType[]
  getObjects: (filter: string | null, sort: Sort['value'] | null) => Promise<TType[]>
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

  useEffect(() => {
    async function updateState() {
      setIsLoading(true)
      let data: TType[]
      try {
        const uri = decodeURI(filter.str || '')
        data = await getObjects(uri || null, sort)
      } catch {
        data = []
      }

      setList(data)

      setIsLoading(false)
    }

    updateState()
  }, [sort, filter])

  return { list, isLoading }
}
