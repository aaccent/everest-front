'use client'
import { useFilter } from '@/features/useFilter'
import { useContext, useEffect, useRef, useState } from 'react'
import { useSort } from '@/features/useSort'
import { PER_PAGE } from '@/globals/pagination'
import { GeneralRequestParams } from '@/types/RequestProps'
import { PopupContext } from '@/features/Popup'

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
  const { updateProps } = useContext(PopupContext)

  const [isLoading, setIsLoading] = useState(false)

  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(PER_PAGE.TILE)

  const { filter } = useFilter()
  const { sort } = useSort()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  function _setList(data: ListType) {
    setList(data as ListType<TType>)
    updateProps('filter', { count: data.total })
  }

  async function _getObjects(pageNumber: number = 1) {
    const options: GeneralRequestParams = {
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
      _setList(data)
    } catch (e) {
      _setList(EMPTY_LIST)
    } finally {
      setIsLoading(false)
    }
  }

  const paginationUpdate = async (newPage: number) => {
    setIsLoading(true)
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

  const restObjects = list.total - list.count * page
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
