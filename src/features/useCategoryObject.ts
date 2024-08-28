'use client'
import { ObjectCard } from '@/types/ObjectCard'
import { Filter, useCategoryFilter } from '@/features/useCategoryFilter'
import { Sort } from '@/types/FiltersType'
import { useEffect, useState } from 'react'
import { useCategorySort } from '@/features/useCategorySort'
import { ComplexCard, LayoutObject } from '@/types/Complex'

export interface Props<TType extends ComplexCard | ObjectCard | LayoutObject> {
  initList: TType[]
  getObjects: (filter?: Filter[], sort?: Sort['value']) => Promise<TType[]>
}
/**
 * Использует хуки {@link useCategoryFilter} и {@link useCategorySort} для контроля внутреннего состояния со списком объектов.
 * @param initList - Инициализирующий список объектов. Выводится пока не будет закончен запрос
 * @param getObjects - функция для запроса объектов
 */
export function useCategoryObjects<TType extends ComplexCard | ObjectCard | LayoutObject>({
  initList,
  getObjects,
}: Props<TType>) {
  const [list, setList] = useState<TType[]>(initList)
  const [isLoading, setIsLoading] = useState(false)
  const { filter } = useCategoryFilter()
  const { sort } = useCategorySort()

  useEffect(() => {
    async function updateState() {
      setIsLoading(true)

      const data = await getObjects(filter.parsed, sort ? sort : undefined)

      setList((current) => {
        if (JSON.stringify(data) === JSON.stringify(current)) {
          return current
        }

        return data
      })

      setIsLoading(false)
    }

    updateState()
  }, [sort, filter])

  return { list, isLoading }
}
