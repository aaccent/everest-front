'use client'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { FilterBlock, FilterType, FilterView } from '@/types/FiltersType'
import { Filter, useFilter } from '@/features/useFilter'

function getActiveFilters(filtersGeneral: FilterType<FilterView>[], activeFilterValues: Filter[]) {
  if (!filtersGeneral.length) return []
  const activeFilters = Object.fromEntries(activeFilterValues.map((filter) => [filter.id, filter]))

  return filtersGeneral.reduce<FilterType<FilterView>[]>(function (accumulator, currentFilter) {
    if (!(currentFilter.id in activeFilters)) return accumulator

    accumulator.push({
      id: currentFilter.id,
      name: currentFilter.name,
      value: activeFilters[currentFilter.id].value,
      fieldType: currentFilter.fieldType as any,
      prefix: currentFilter.prefix,
    })

    return accumulator
  }, [])
}

function convertBlocksToFilterType(blocks: FilterBlock[]): FilterType<FilterView>[] {
  return blocks.reduce((acc, current) => acc.concat(current.filters), [] as FilterType<FilterView>[])
}

interface FilterTagsContextProps {
  activeFilters: FilterType<FilterView>[]
}

export const FilterTagsContext = createContext({} as FilterTagsContextProps)

interface FilterTagsProps extends PropsWithChildren {
  list: FilterBlock[] | FilterType<FilterView>[]
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
    const convertedList =
      'filters' in list ? convertBlocksToFilterType(list as FilterBlock[]) : (list as FilterType<FilterView>[])
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
