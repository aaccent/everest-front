'use client'
import React from 'react'
import { FilterType, FilterView } from '@/types/FiltersType'
import Selector from '@/ui/inputs/Selector'
import SelectorInline from '@/ui/inputs/SelectorInline'
import Range, { RangeValue } from '@/ui/inputs/Range'
import Checkbox from '@/ui/inputs/Checkbox'
import PriceRange from '@/ui/inputs/PriceRange'
import { Filter, useFilter } from '@/features/useFilter'

/** @param filters Полученный от бэкенда массив фильтров
 * @param isQuick  Если `true`, то показывает заголовок поля фильтра, иначе скрывает.*/

interface FilterItemsProps {
  filters: FilterType<FilterView>[]
  isQuick?: boolean
}

function valueIsNull(value: Filter['value']) {
  if (value instanceof Array && value[0] === null) {
    return true
  }

  return value === null
}

export function FilterItems({ filters, isQuick = false }: FilterItemsProps) {
  const filterManager = useFilter()

  function onChange(id: string, value: Filter['value'] | RangeValue) {
    filterManager.addFilter(Number(id), value)
  }

  function getCurrentFilter<T extends Filter['value']>(id: number) {
    return filterManager.findFilter<{ id: number; value: T }>(id)
  }

  return filters.map((filter) => {
    if (valueIsNull(filter.value) && filter.fieldType !== 'toggle') return null

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
        const customValue = getCurrentFilter<number[]>(filter.id)?.value

        const RangeComponent = filter.prefix === '₽' ? PriceRange : Range

        return (
          <RangeComponent
            key={filter.id}
            min={filter.value[0]}
            max={filter.value[1]}
            name={filter.id.toString()}
            title={filter.name}
            showTitle={!isQuick}
            defaultValue={filter.value}
            value={customValue}
            onChange={onChange}
            prefix={filter.prefix}
            step={filter.prefix === '₽' ? 0.1 : 1}
          />
        )
      }
      case 'toggle': {
        const value = getCurrentFilter<boolean>(filter.id)?.value

        return (
          <Checkbox
            key={filter.id}
            title={filter.name}
            name={filter.id.toString()}
            defaultChecked={value || false}
            checked={value || false}
            value={filter.id.toString()}
            onChange={onChange}
            changeMobileView
          />
        )
      }
    }
  })
}
