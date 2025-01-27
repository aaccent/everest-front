'use client'
import React from 'react'
import { useFilter } from '@/features/useFilter'
import { formatTagText } from '@/features/utility/texts'
import { FilterType, FilterView } from '@/types/FiltersType'

interface Props {
  activeFilters: FilterType<FilterView>[]
}

export function FilterTags({ activeFilters }: Props) {
  const { removeFilter } = useFilter()

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

  if (!activeFilters) return null

  return (
    <div className={`hidden flex-wrap items-center gap-[10px] md:flex ${activeFilters.length ? 'mb-[64px]' : ''}`}>
      {showAllTags()}
    </div>
  )
}
