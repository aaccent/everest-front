'use client'
import { useFilter } from '@/features/useFilter'
import { useEffect, useRef, useState } from 'react'
import { useSort } from '@/features/useSort'
import { PER_PAGE } from '@/globals/pagination'
import { GeneralRequestParams } from '@/types/RequestProps'
import { useSearchParams } from 'next/navigation'

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

export type GetObjectsFn<TType = unknown> = (options: GeneralRequestParams) => Promise<ListType<TType>>

export interface Props<TType = unknown> {
  initList: ListType<TType>
  getObjects: GetObjectsFn<TType>
}

export type ObjectManagerType = ReturnType<typeof useFilterAndPagination>

/**
 * Использует хуки {@link useFilter} и {@link useSort} для контроля внутреннего состояния со списком объектов.
 * @param initList - Инициализирующий список объектов. Выводится пока не будет закончен запрос
 * @param getObjects - функция для запроса объектов
 */
export function useFilterAndPagination<TType = unknown>({ initList, getObjects }: Props<TType>) {
  const [list, setList] = useState<ListType<TType>>(initList)

  const [isLoading, setIsLoading] = useState(false)

  const searchParams = useSearchParams()
  const initialPage = Number(searchParams.get('page')) || 1
  const [page, setPage] = useState<number>(initialPage)

  const [perPage, setPerPage] = useState<number>(PER_PAGE.TILE)

  const { filter } = useFilter()
  const { sort } = useSort()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  function _setList(data: ListType) {
    setList(data as ListType<TType>)
  }

  async function _getObjects(pageNumber: number = initialPage) {
    const options: GeneralRequestParams = {
      filter: filter.parsed,
      sort,
      page: pageNumber,
      perPage,
    }
    return await getObjects(options)
  }

  // TODO: исправить проблему с запуском при загрузки без фильтров
  const filterUpdate = async () => {
    try {
      const data = await _getObjects()
      setPage(initialPage)
      _setList(data)
    } catch (e) {
      _setList(EMPTY_LIST)
    } finally {
      setIsLoading(false)
    }
  }

  const paginationUpdate = async (newPage: number) => {
    try {
      const data = await _getObjects(newPage)
      const { objects, count, total } = data
      _setList({
        objects: list.objects.concat(objects as TType),
        count,
        total,
      })
    } catch (e) {
      _setList(EMPTY_LIST)
    } finally {
      setIsLoading(false)
    }
  }

  const searchParamsUpdate = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', `${pageNumber}`)
    window.history.replaceState(null, '', `?${params.toString()}`)
  }

  useEffect(() => {
    if (page === initialPage) return
    searchParamsUpdate(page)
    paginationUpdate(page)
  }, [page])

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(filterUpdate, 500)
  }, [sort, filter])

  function nextPage() {
    setPage((currentPage) => ++currentPage)
  }

  const restObjects = list.total - perPage * page
  const hasNextPage = list.count > perPage || restObjects > 0
  const restForShowing = restObjects >= perPage ? perPage : restObjects

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
      restForShowing,
      hasNextPage,
    },
  }
}
