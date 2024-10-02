'use client'
import React, { useEffect, useState } from 'react'
import { FilterBlock, FilterType, FilterView } from '@/types/FiltersType'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import { getFilters } from '@/globals/api'
import QuickFiltersTags from '@/components/QuickFilter/QuickFiltersTags'
import { PopupFilterTags } from '@/ui/popups/FilterPopup/PopupFilterTags'

type FiltersTagsProps = {
  isQuick?: boolean
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

function FilterTags({ category, list, isQuick, className }: FiltersTagsProps) {
  const [activeFilters, setActiveFilters] = useState<FilterType<FilterView>[]>([])
  const { filter } = useCategoryFilter()

  function getActiveFilters(filtersGeneral: FilterBlock[]) {
    if (!filtersGeneral.length) return []
    const allFiltersList = filtersGeneral.map((block) => block.filters).reduce((acc, f) => acc.concat(f), [])
    const activeId = filter.parsed.map((filter) => filter.id)
    const activeFilters = allFiltersList.filter((filter) => activeId.includes(filter.id))
    return activeFilters.map((f) => {
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
  return (
    <div className={className}>
      {isQuick ? <QuickFiltersTags list={activeFilters} /> : <PopupFilterTags list={activeFilters} />}
    </div>
  )
}

export default FilterTags
