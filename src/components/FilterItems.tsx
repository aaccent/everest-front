'use client'
import { FilterType, FilterView } from '@/types/FiltersType'
import Selector from '@/ui/inputs/Selector'
import SelectorInline from '@/ui/inputs/SelectorInline'
import Range, { RangeValue } from '@/ui/inputs/Range'
import Checkbox from '@/ui/inputs/Checkbox'
import React from 'react'
import { Filter, useFilter } from '@/features/catalog/useFilter'
import { formatLongPriceForRange, formatShortPriceObjForRange } from '@/features/utility/price'

/** @param filters Полученный от бэкенда массив фильтров
 * @param isQuick  Если `true`, то показывает заголовок поля фильтра, иначе скрывает.*/

interface FilterItemsProps {
  filters: FilterType<FilterView>[]
  isQuick?: boolean
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

        const formalValue = (prefix: string) => {
          switch (prefix) {
            case '₽':
              return {
                value: formatShortPriceObjForRange(value),
                onChange: (id: string, newValue: RangeValue) => {
                  onChange(id, formatLongPriceForRange(newValue))
                },
                min: formatShortPriceObjForRange(filter.value).min,
                max: formatShortPriceObjForRange(filter.value).max,
                step: 0.1,
                prefix: `млн ${prefix}`,
              }
            default: {
              return {
                value,
                onChange,
                min: filter.value.min,
                max: filter.value.max,
                prefix,
              }
            }
          }
        }
        return (
          <Range
            min={formalValue(filter.prefix).min}
            max={formalValue(filter.prefix).max}
            name={filter.id.toString()}
            title={filter.name}
            showTitle={!isQuick}
            defaultValue={formalValue(filter.prefix).value}
            value={formalValue(filter.prefix).value}
            onChange={formalValue(filter.prefix).onChange}
            prefix={formalValue(filter.prefix).prefix || ''}
            step={formalValue(filter.prefix).step}
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
            changeMobileView
          />
        )
      }
    }
  })
}
