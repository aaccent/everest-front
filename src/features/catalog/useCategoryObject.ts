'use client'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import { Sort } from '@/types/FiltersType'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useCategorySort } from '@/features/catalog/useCategorySort'
import { PER_PAGE } from '@/layout/catalog/CategoryContext'

export type Options = {
  filter: object[] | null
  sort: Sort['value'] | null
  page: number
  perPage: number
}

export type ListType = {
  objects: unknown[]
  total: number
  count: number
}

const emptyList: ListType = {
  objects: [],
  count: 0,
  total: 0,
}

export type GetObjectsFn<TType = unknown> = (options: Options) => Promise<{
  objects: TType[]
  total: number
  count: number
}>

export interface Props<TType = unknown> {
  initList: TType[]
  getObjects: GetObjectsFn<TType>
}

export type ObjectManagerType = {
  list: ListType
  loading: {
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
  }
  pagination: {
    page: number
    setPage: Dispatch<SetStateAction<number>>
    perPage: number
    setPerPage: Dispatch<SetStateAction<number>>
  }
}

/**
 * Использует хуки {@link useCategoryFilter} и {@link useCategorySort} для контроля внутреннего состояния со списком объектов.
 * @param initList - Инициализирующий список объектов. Выводится пока не будет закончен запрос
 * @param getObjects - функция для запроса объектов
 */
export function useCategoryObjects<TType = unknown>({ initList, getObjects }: Props<TType>): ObjectManagerType {
  const [list, setList] = useState<ListType>({
    objects: initList,
    total: initList.length,
    count: initList.length - PER_PAGE.TILE,
  })

  const [isLoading, setIsLoading] = useState(false)

  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(PER_PAGE.TILE)

  const { filter } = useCategoryFilter()
  const { sort } = useCategorySort()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  async function _getObjects(pageNumber: number = page) {
    const options: Options = {
      filter: filter.parsed,
      sort,
      page: pageNumber,
      perPage,
    }
    return await getObjects(options)
  }

  const filterUpdate = async () => {
    setIsLoading(true)
    try {
      const data = await _getObjects(1)
      setPage(1)
      setList(data)
    } catch (e) {
      setList(emptyList)
    } finally {
      setIsLoading(false)
    }
  }

  const paginationUpdate = async () => {
    setIsLoading(true)
    try {
      const data = await _getObjects()
      const { objects, count, total } = data
      setList({
        objects: list.objects.concat(objects),
        count,
        total,
      })
    } catch (e) {
      setList(emptyList)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(filterUpdate, 500)
  }, [sort, filter])

  useEffect(() => {
    if (page === 1) return
    paginationUpdate()
  }, [page, perPage])

  return {
    list,
    loading: {
      isLoading,
      setIsLoading,
    },
    pagination: {
      page,
      setPage,
      perPage,
      setPerPage,
    },
  }
}
