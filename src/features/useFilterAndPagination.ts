'use client'
import { useFilter } from '@/features/useFilter'
import { Sort } from '@/types/FiltersType'
import { useEffect, useRef, useState } from 'react'
import { useSort } from '@/features/useSort'
import { PER_PAGE } from '@/layout/catalog/CategoryContext'

type GetObjectsOptions = {
  filter: object[] | null
  sort: Sort['value'] | null
  page: number
  perPage: number
}

export type ListType<TType = unknown> = {
  objects: TType[]
  /** Общее количество объектов в категории */
  total: number
  /** Количество объектов, которое добавилось к общему списку объектов после изменения пагинации */
  count: number
}

const EMPTY_LIST: ListType = {
  objects: [],
  count: 0,
  total: 0,
}

export type GetObjectsFn<TType = unknown> = (options: GetObjectsOptions) => Promise<ListType>

export interface Props<TType = unknown> {
  initList: TType[]
  getObjects: GetObjectsFn<TType>
}

export type ObjectManagerType = ReturnType<typeof useFilterAndPagination>

/**
 * Использует хуки {@link useFilter} и {@link useSort} для контроля внутреннего состояния со списком объектов.
 * @param initList - Инициализирующий список объектов. Выводится пока не будет закончен запрос
 * @param getObjects - функция для запроса объектов
 */
export function useFilterAndPagination<TType = unknown>({ initList, getObjects }: Props<TType>) {
  const [list, setList] = useState<ListType>({
    objects: initList,
    total: initList.length,
    count: initList.length - PER_PAGE.TILE,
  })

  const [isLoading, setIsLoading] = useState(false)

  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(PER_PAGE.TILE)

  const { filter } = useFilter()
  const { sort } = useSort()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  async function _getObjects(pageNumber: number = 1) {
    const options: GetObjectsOptions = {
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
      const data = await _getObjects()
      setPage(1)
      setList(data)
    } catch (e) {
      setList(EMPTY_LIST)
    } finally {
      setIsLoading(false)
    }
  }

  const paginationUpdate = async (newPage: number) => {
    setIsLoading(true)
    try {
      const data = await _getObjects(newPage)
      const { objects, count, total } = data
      setList({
        objects: list.objects.concat(objects),
        count,
        total,
      })
    } catch (e) {
      setList(EMPTY_LIST)
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

  function nextPage() {
    setPage((currentPage) => {
      const newPage = ++currentPage
      paginationUpdate(newPage)
      return newPage
    })
  }

  return {
    list,
    loading: {
      isLoading,
      setIsLoading,
    },
    pagination: {
      page,
      nextPage,
      perPage,
      setPerPage,
    },
  }
}
