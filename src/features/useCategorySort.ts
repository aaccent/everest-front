'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useCategorySort() {
  const searchParams = useSearchParams()

  function getSortFromUrl(): string | null {
    return searchParams.has('sort') ? searchParams.get('sort') : null
  }

  const [sort, setSort] = useState<string | null>(getSortFromUrl())

  useEffect(() => {
    setSort(getSortFromUrl())
  }, [searchParams])

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
