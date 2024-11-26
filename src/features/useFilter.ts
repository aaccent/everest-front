'use client'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { convertToBase64, convertBase64ToArray } from '@/features/utility/convertBase64'
import { FilterBlock, FilterType, FilterView } from '@/types/FiltersType'
import { convertBlocksToFilterType, getActiveFilters } from '@/features/utility/filters'

export interface Filter {
  id: number
  value: string[] | boolean | [number, number]
}

interface Props {
  filterInputs?: FilterBlock[]
}

export function useFilter({ filterInputs = [] }: Props = {}) {
  const searchParams = useSearchParams()

  /**
   * Вытаскивает значение GET параметра `filter` из ссылки.
   * @return `base64` строку
   */
  function getFiltersSearchParams() {
    return searchParams.get('filter')
  }

  /**
   * Читает из GET параметров ссылки значение фильтра,
   * парсит из base64 в JSON строку, затем в массив {@link Filter} элементов.
   * @return `Filter[]` если значение установлено, иначе пустой массив.
   */
  const parseSearchParamsToFilter = useCallback((): Filter[] => {
    const currentFilter = getFiltersSearchParams()
    if (!currentFilter) return []
    return convertBase64ToArray(currentFilter)
  }, [searchParams])

  const [filter, setFilters] = useState<{ str: string | null; parsed: Filter[] }>({
    str: getFiltersSearchParams(),
    parsed: parseSearchParamsToFilter(),
  })

  const [activeFiltersForTags, setActiveFiltersForTags] = useState<FilterType<FilterView>[]>([])

  useEffect(() => {
    const convertedList = convertBlocksToFilterType(filterInputs)
    setActiveFiltersForTags(getActiveFilters(convertedList, filter.parsed))
  }, [filter])

  function findFilter<T extends Filter>(id: number): T | undefined {
    return filter.parsed.find((item) => item.id === id) as unknown as T
  }

  useEffect(() => {
    setFilters((current) => {
      const filterSearchParams = getFiltersSearchParams()
      if (current.str === filterSearchParams) return current
      return {
        str: filterSearchParams,
        parsed: parseSearchParamsToFilter(),
      }
    })
  }, [searchParams])

  /**
   * Кодирует значения в `base64` и добавляет результат в
   * GET параметры ссылки новое значение `value` фильтра по `id`.
   * Если значение уже существует, то заменяет его новым.
   *
   * ```js
   * addFilter(1, ["value1", "value2"])
   * ```
   * добавит в ссылку массив с объектом
   * ```json
   * [{id:1,value:["value1","value2"]}]
   * ```
   * в base64 представлении
   * @param id - идентификатора фильтра
   * @param value - значение фильтра. Если передаётся boolean, то в
   * ссылку попадают `"true"` и `"false"` строки
   */
  function addFilter(id: number, value: Filter['value']) {
    const newFilter = new Map<number, Filter>(filter.parsed.map((i) => [i.id, i]))

    if (!newFilter.has(id)) {
      newFilter.set(id, { id, value })
    } else if ((value instanceof Array && !value.length) || !value) {
      newFilter.delete(id)
    } else {
      newFilter.get(id)!.value = value
    }

    const params = new URLSearchParams(searchParams.toString())
    params.set('filter', convertToBase64([...newFilter.values()]))
    window.history.replaceState(null, '', `?${params.toString()}`)
  }

  function clearFilters() {
    setFilters({ str: '', parsed: [] })
    const params = new URLSearchParams(searchParams.toString())
    params.delete('filter')
    window.history.replaceState(null, '', `?${params.toString()}`)
  }

  function removeFilter(id: number) {
    const newFilters = filter.parsed.filter((f) => f.id !== id)
    if (!newFilters.length) return clearFilters()
    const params = new URLSearchParams(searchParams.toString())
    params.set('filter', convertToBase64(newFilters))
    window.history.replaceState(null, '', `?${params.toString()}`)
  }

  return { filter, addFilter, findFilter, clearFilters, removeFilter, activeFiltersForTags }
}
