'use client'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { FilterBlock, FilterType, FilterView } from '@/types/FiltersType'
import { Filter, useCategoryFilter } from '@/features/catalog/useCategoryFilter'

function getActiveFilters(filtersGeneral: FilterType<FilterView>[], activeFilterValues: Filter[]) {
  if (!filtersGeneral.length) return []
  const activeFilters = Object.fromEntries(activeFilterValues.map((filter) => [filter.id, filter]))

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
      name: currentFilter.name, //@ts-ignore
      value: formatValue(activeFilters[currentFilter.id].value),
      fieldType: currentFilter.fieldType,
      prefix: currentFilter.prefix,
    })

    return accumulator
  }, [] as FilterType<FilterView>[])
}

function convertBlocksToFilterType(blocks: FilterBlock[]): FilterType<FilterView>[] {
  return blocks.reduce((acc, current) => acc.concat(current.filters), [] as FilterType<FilterView>[])
}

interface FilterTagsContextProps {
  activeFilters: FilterType<FilterView>[]
}

export const FilterTagsContext = createContext({} as FilterTagsContextProps)

interface FilterTagsProps extends PropsWithChildren {
  list: FilterBlock[]
}

function FilterTagsProvider({ list, children }: FilterTagsProps) {
  const { filter } = useCategoryFilter()

  const [activeFilters, setActiveFilters] = useState<FilterType<FilterView>[]>([])

  useEffect(() => {
    setActiveFilters(getActiveFilters(convertBlocksToFilterType(list), filter.parsed))
  }, [list, filter])

  return (
    <FilterTagsContext.Provider
      value={{
        activeFilters,
      }}
    >
      {children}
    </FilterTagsContext.Provider>
  )
}

export default FilterTagsProvider
