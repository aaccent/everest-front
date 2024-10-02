'use client'
import { FilterType, FilterView } from '@/types/FiltersType'
import Selector from '@/ui/inputs/Selector'
import SelectorInline from '@/ui/inputs/SelectorInline'
import Range, { RangeValue } from '@/ui/inputs/Range'
import Checkbox from '@/ui/inputs/Checkbox'
import React from 'react'
import { Filter, useCategoryFilter } from '@/features/catalog/useCategoryFilter'

/** @param filters Полученный от бэкенда массив фильтров
 * @param isQuick  Если `true`, то показывает заголовок поля фильтра, иначе скрывает.*/

interface FilterItemsProps {
  filters: FilterType<FilterView>[]
  isQuick?: boolean
}

export function FilterItems({ filters, isQuick = false }: FilterItemsProps) {
  const filterManager = useCategoryFilter()

  function onChange(id: string, value: Filter['value'] | RangeValue) {
    filterManager.addFilter(Number(id), value)
  }

  function getCurrentFilter<T extends Filter['value']>(id: number) {
    return filterManager.findFilter<{ id: number; value: T }>(id)
  }

  return filters.map((filter) => {
    if (!filter.value && filter.fieldType !== 'toggle') return null

    switch (filter.fieldType) {
      case 'multilist': {
        const activeValues = getCurrentFilter<string[]>(filter.id)?.value || []

        return (
          <Selector
            key={filter.id}
            list={filter.value}
            title={filter.name}
            name={filter.id.toString()}
            showTitle={!isQuick}
            defaultValue={activeValues}
            value={activeValues}
            onChange={onChange}
          />
        )
      }
      case 'inline-multilist': {
        const activeValues = getCurrentFilter<Array<string>>(filter.id)?.value || []

        return (
          <SelectorInline
            key={filter.id}
            list={filter.value}
            name={filter.id.toString()}
            title={filter.name}
            showTitle={!isQuick}
            defaultValue={activeValues}
            value={activeValues}
            onChange={onChange}
          />
        )
      }
      case 'range': {
        const rawValue = getCurrentFilter<[number, number]>(filter.id)?.value
        const value = rawValue
          ? { min: rawValue[0], max: rawValue[1] }
          : {
              min: filter.value.min,
              max: filter.value.max,
            }
        return (
          <Range
            min={filter.value.min}
            max={filter.value.max}
            name={filter.id.toString()}
            title={filter.name}
            showTitle={!isQuick}
            defaultValue={value}
            value={value}
            onChange={onChange}
            prefix={filter.prefix ? filter.prefix : ''}
          />
        )
      }
      case 'toggle': {
        const value = getCurrentFilter<boolean>(filter.id)?.value

        return (
          <Checkbox
            title={filter.name}
            name={filter.id.toString()}
            defaultChecked={value || false}
            checked={value || false}
            value={filter.id.toString()}
            onChange={onChange}
          />
        )
      }
    }
  })
}
