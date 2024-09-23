'use client'
import { FilterBlock, FilterType, FilterView } from '@/types/FiltersType'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import React, { useEffect, useState } from 'react'
import { getFilters } from '@/globals/api/methods/getFilters'

interface Type {
  id: number
  name: string
  value: any
  fieldType: FilterView['fieldType']
}

function formatTagText(f: Type) {
  switch (f.fieldType) {
    case 'range':
      return `${f.name}: ${f.value[0]} - ${f.value[1]}`
    case 'toggle':
      return `${f.name}`
    default:
      return `${f.name}: ${f.value}`
  }
}

type FiltersTagsProps = {
  className?: string
} & (
  | {
      category: string
      list?: never
    }
  | {
      list: FilterBlock[]
      category?: never
    }
)

export function FiltersTags({ className, category, list }: FiltersTagsProps) {
  const [activeFilters, setActiveFilters] = useState<FilterType<FilterView>[]>([])
  const { removeFilter, filter } = useCategoryFilter()

  function getActiveFilters(filtersGeneral: FilterBlock[]) {
    if (!filtersGeneral.length) return []
    const allFiltersList = filtersGeneral.map((block) => block.filters).reduce((acc, f) => acc.concat(f), [])
    const activeId = filter.parsed.map((filter) => {
      return filter.id
    })
    const activeF = allFiltersList.filter((filter) => activeId.includes(filter.id))
    return activeF.map((f) => {
      return {
        id: f.id,
        name: f.name,
        value: filter.parsed.find((item) => item.id === f.id)!.value,
        fieldType: f.fieldType,
      }
    })
  }

  useEffect(() => {
    if (category) {
      getFilters(category).then((res) => {
        setActiveFilters(getActiveFilters(res.filters) as FilterType<FilterView>[])
      })
    }
    if (list) {
      setActiveFilters(getActiveFilters(list) as FilterType<FilterView>[])
    }
  }, [list, filter])

  function showTags() {
    return activeFilters.map((f) => {
      return f.value ? (
        <button
          className='text-base-400-lg-100 flex items-center gap-[4px] text-nowrap rounded-[50px] bg-primary py-[6.5px] pl-[12px] pr-[7px] text-base-100 after:block after:size-[16px] after:bg-icon-close after:filter-base-100 after:bg-default-auto'
          key={f.id}
          onClick={() => removeFilter(f.id)}
        >
          {formatTagText(f)}
        </button>
      ) : null
    })
  }

  return <div className={`flex items-center gap-[10px] ${className}`}>{showTags()}</div>
}
