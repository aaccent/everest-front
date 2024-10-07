'use client'
import React from 'react'
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
  const { filter } = useCategoryFilter()

  function getActiveFilters(filtersGeneral: FilterType<FilterView>[]) {
    if (!filtersGeneral.length) return []
    const activeFilters = Object.fromEntries(filter.parsed.map((filter) => [filter.id, filter]))

    function formatValue(value: FilterView['value']) {
      if (typeof value === 'object' && 'min' in value) {
        return [value.min, value.max]
      }
      return value
    }

    return filtersGeneral.reduce(function (accumulator, currentFilter) {
      if (!(currentFilter.id in activeFilters)) return accumulator

      accumulator.push({
        id: currentFilter.id,
        name: currentFilter.name,
        //@ts-ignore
        value: formatValue(activeFilters[currentFilter.id].value),
        fieldType: currentFilter.fieldType,
        prefix: currentFilter.prefix,
      })

      return accumulator
    }, [] as FilterType<FilterView>[])
  }

  const activeFilters = getActiveFilters(list) as FilterType<FilterView>[]
  return (
    <div className={className}>
      {isQuick ? <QuickFiltersTags list={activeFilters} /> : <PopupFilterTags list={activeFilters} />}
    </div>
  )
}

export default FilterTags
