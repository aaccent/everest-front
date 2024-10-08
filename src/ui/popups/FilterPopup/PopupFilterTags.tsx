'use client'
import { FilterType, FilterView } from '@/types/FiltersType'
import React, { useEffect, useState } from 'react'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import { formatShortPriceArrForRange } from '@/features/utility/price'

interface Type {
  id: number
  name: string
  value: any
  fieldType: FilterView['fieldType']
  prefix?: string
}

export function formatTagText(f: Type) {
  switch (f.fieldType) {
    case 'range':
      const min =
        f.prefix === '₽'
          ? `${formatShortPriceArrForRange(f.value)[0]} млн ${f.prefix}`
          : `${f.value[0]} ${f.prefix || ''}`
      const max =
        f.prefix === '₽'
          ? `${formatShortPriceArrForRange(f.value)[1]} млн ${f.prefix}`
          : `${f.value[1]} ${f.prefix || ''}`
      return `${f.name}: ${min} - ${max}`
    case 'toggle':
      return `${f.name}`
    default:
      return `${f.name}: ${f.value}`
  }
}

export function PopupFilterTags({ list }: { list: FilterType<FilterView>[] }) {
  const [activeFilters, setActiveFilters] = useState<FilterType<FilterView>[]>([])
  const { removeFilter } = useCategoryFilter()
  useEffect(() => {
    setActiveFilters(list)
  }, [list])

  function showAllTags() {
    return activeFilters.map((f) => {
      return f.value ? (
        <button
          className='text-base-400-lg-100 flex items-center gap-[5px] text-nowrap rounded-[50px] bg-base-300 px-[12px] py-[6.5px] text-base-600 after:block after:size-[10px] after:bg-icon-close after:filter-base-600 after:bg-default-cover'
          key={f.id}
          onClick={() => removeFilter(f.id)}
        >
          {formatTagText(f)}
        </button>
      ) : null
    })
  }

  return showAllTags()
}
