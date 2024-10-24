'use client'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { FilterBlock, FilterType, FilterView } from '@/types/FiltersType'
import { Filter, useFilter } from '@/features/useFilter'

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
      name: currentFilter.name,
      // @ts-expect-error
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

/**
 * Хранит в себе выбранные фильтры, для вывода тегов в быстром фильтре и в попапе детальных фильтров.
 * Преобразует [массив FilterBlock]{@link FilterBlock} в [массив FilterType]{@link FilterType}.
 * Синхронизирует изменения в детальном и быстром фильтрах
 */

function FilterTagsProvider({ list, children }: FilterTagsProps) {
  const { filter } = useFilter()

  const [activeFilters, setActiveFilters] = useState<FilterType<FilterView>[]>([])

  useEffect(() => {
    const convertedList = convertBlocksToFilterType(list)
    setActiveFilters(getActiveFilters(convertedList, filter.parsed))
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
