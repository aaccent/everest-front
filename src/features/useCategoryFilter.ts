'use client'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

function convertToBase64(array: any[]) {
  const string = JSON.stringify(array)
  const buffer = new TextEncoder().encode(string)
  const utf8Arr = Array.from(buffer)
  const utf8 = utf8Arr.map((byte) => String.fromCodePoint(byte)).join('')
  return btoa(utf8)
}

function convertBase64ToArray(base64: string) {
  const utf8 = atob(base64)
  const byteArr = utf8.split('').map((char) => char.codePointAt(0))

  // @ts-ignore
  const utf8Arr = Uint8Array.from(byteArr)
  const str = new TextDecoder().decode(utf8Arr)
  return JSON.parse(str)
}

export interface Filter {
  id: number
  value: string[] | (string | number)[] | { min: number; max: number } | boolean
}

export function useCategoryFilter() {
  const searchParams = useSearchParams()

  /**
   * Вытаскивает значение GET параметра `filter` из ссылки.
   * @return `base64` строку
   */
  function getFiltersSearchParams() {
    return searchParams.has('filter') ? searchParams.get('filter') : null
  }

  /**
   * Читает из GET параметров ссылки значение фильтра,
   * парсит из base64 в JSON строку, затем в [Filter[]]{@link Filter}.
   * @return `Filter[]` если значение установлено, иначе пустой массив.
   */
  const parseSearchParamsToFilter = useCallback((): Filter[] | [] => {
    const currentFilter = getFiltersSearchParams()
    if (!currentFilter) return []
    return convertBase64ToArray(currentFilter)
  }, [searchParams])

  const [filter, setFilters] = useState<{ str: string | null; parsed: Filter[] }>({
    str: getFiltersSearchParams(),
    parsed: parseSearchParamsToFilter(),
  })

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
    const newFilter = [...filter.parsed]

    const sameId = filter.parsed.findIndex((item) => item.id === id)
    if (sameId === -1) {
      newFilter.push({ id, value })
    } else {
      newFilter[sameId].value = value
    }

    window.history.replaceState(null, '', `?filter=${encodeURIComponent(convertToBase64(newFilter))}`)
  }

  return { filter, getFiltersSearchParams, parseSearchParamsToFilter, addFilter, findFilter, setFilters }
}
