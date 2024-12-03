import { FilterBlock, FilterType, FilterView } from '@/types/FiltersType'
import { Filter } from '@/features/useFilter'

export function getActiveFilters(filtersGeneral: FilterType<FilterView>[], activeFilterValues: Filter[]) {
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

export function convertBlocksToFilterType(blocks: FilterBlock[]): FilterType<FilterView>[] {
  return blocks.reduce((acc, current) => acc.concat(current.filters), [] as FilterType<FilterView>[])
}
