'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

/** Функциональность для управления сортировкой категории в GET параметрах ссылки */
export function useSort() {
  const searchParams = useSearchParams()

  /**
   * Получить установленное в GET параметрах ссылки значение сортировки.
   * @return Если значение установлено, то `string`, иначе `null`.
   * */
  function getSortFromUrl(): string | null {
    return searchParams.has('sort') ? searchParams.get('sort') : null
  }

  const [sort, setSort] = useState<string | null>(getSortFromUrl())

  useEffect(() => {
    setSort(getSortFromUrl())
  }, [searchParams])

  /**
   * Устанавливает сортировку `value` в GET параметры ссылки.
   * Если передано `null`, то GET параметр убирается.
   * @param value - `string` для установки значения и `null`, чтобы убрать значение
   * */
  function addSort(value: string | null) {
    const params = new URLSearchParams(searchParams.toString())

    if (!value) {
      params.delete('sort')
      window.history.replaceState(null, '', `?${params}`)
    } else {
      params.set('sort', value)
      window.history.replaceState(null, '', `?${params.toString()}`)
    }
  }

  return { sort, getSortFromUrl, setSort, addSort }
}
