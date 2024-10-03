'use client'
import React, { useEffect, useState } from 'react'
import { FilterType, FilterView } from '@/types/FiltersType'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import QuickFiltersTags from '@/components/QuickFilter/QuickFiltersTags'
import { PopupFilterTags } from '@/ui/popups/FilterPopup/PopupFilterTags'

type FiltersTagsProps = {
  isQuick?: boolean
  className?: string
  list: FilterType<FilterView>[]
}

function FilterTags({ list, isQuick, className }: FiltersTagsProps) {
  const [activeFilters, setActiveFilters] = useState<FilterType<FilterView>[]>([])
  const { filter } = useCategoryFilter()

  function getActiveFilters(filtersGeneral: FilterType<FilterView>[]) {
    if (!filtersGeneral.length) return []
    const activeId = filter.parsed.map((filter) => filter.id)
    const activeFilters = filtersGeneral.filter((filter) => activeId.includes(filter.id))
    return activeFilters.map((f) => {
      return {
        id: f.id,
        name: f.name,
        value: filter.parsed.find((item) => item.id === f.id)!.value,
        fieldType: f.fieldType,
        prefix: f.prefix,
      }
    })
  }

  useEffect(() => {
    setActiveFilters(getActiveFilters(list) as FilterType<FilterView>[])
  }, [list, filter])
  return (
    <div className={className}>
      {isQuick ? <QuickFiltersTags list={activeFilters} /> : <PopupFilterTags list={activeFilters} />}
    </div>
  )
}

export default FilterTags
