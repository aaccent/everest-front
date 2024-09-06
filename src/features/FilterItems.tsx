'use client'
import { FilterType, FilterView } from '@/types/FiltersType'
import Selector from '@/ui/inputs/Selector'
import SelectorInline from '@/ui/inputs/SelectorInline'
import Range from '@/ui/inputs/Range'
import Checkbox from '@/ui/inputs/Checkbox'
import React from 'react'
import { Filter, useCategoryFilter } from '@/features/useCategoryFilter'

/** @param filters Полученный от бэкенда массив фильтров
 * @param isQuick  Если `true`, то показывает заголовок поля фильтра, иначе скрывает.*/

interface FilterItemsProps {
  filters: FilterType<FilterView>[]
  isQuick?: boolean
}

export function FilterItems({ filters, isQuick = false }: FilterItemsProps) {
  const classNameDesktop = !isQuick ? `md:!border md:border-base-400` : ''
  const classNameMobile = `border border-base-400`
  const filterManager = useCategoryFilter()

  function onChange(id: number, value: Filter['value']) {
    filterManager.addFilter(id, value)
  }

  function getCurrentFilter<T extends Filter['value']>(id: number) {
    return filterManager.findFilter<{ id: number; value: T }>(id)
  }

  return filters.map((filter) => {
    if (!filter.value) return null

    switch (filter.fieldType) {
      case 'multilist': {
        const activeValues = new Set(getCurrentFilter<string[]>(filter.id)?.value)
        return (
          <Selector
            values={filter.value}
            name={filter.name}
            key={filter.id}
            id={filter.id}
            showTitle={!isQuick}
            className={classNameDesktop}
            onChange={onChange}
            initValue={activeValues}
          />
        )
      }
      case 'inline-multilist': {
        const activeValues = getCurrentFilter<Array<string>>(filter.id)?.value
        const activeValueIndexes = activeValues?.map((activeVal) => filter.value.indexOf(activeVal))

        return (
          <SelectorInline
            list={filter.value}
            key={filter.id}
            id={filter.id}
            name={filter.name}
            showTitle={!isQuick}
            className={classNameMobile}
            onChange={onChange}
            initValue={activeValueIndexes}
          />
        )
      }
      case 'range': {
        const rawValue = getCurrentFilter<[number, number]>(filter.id)?.value
        const value = rawValue ? { min: rawValue[0], max: rawValue[1] } : undefined
        return (
          <Range
            min={filter.value.min}
            max={filter.value.max}
            id={filter.id}
            name={filter.name}
            showTitle={!isQuick}
            className={classNameMobile}
            onChange={onChange}
            initValue={value}
          />
        )
      }
      case 'toggle':
        return (
          <Checkbox
            name={filter.name}
            id={filter.id}
            onChange={onChange}
            initValue={getCurrentFilter<boolean>(filter.id)?.value}
          />
        )
    }
  })
}