import { FilterType, FilterView } from '@/types/FiltersType'
import Selector from '@/ui/inputs/Selector'
import SelectorInline from '@/ui/inputs/SelectorInline'
import Range from '@/ui/inputs/Range'
import Checkbox from '@/ui/inputs/Checkbox'
import React from 'react'

/** @param filters Полученный от бэкенда массив фильтров
 * @param isQuick  Если `true`, то показывает заголовок поля фильтра, иначе скрывает.*/

export function showFilterItems(filters: FilterType<FilterView>[], isQuick: boolean = false) {
  const classNameDesktop = !isQuick ? `md:!border md:border-base-400` : ''
  const classNameMobile = `border border-base-400`

  return filters.map((filter) => {
    if (!filter.value) return null

    switch (filter.fieldType) {
      case 'multilist':
        return (
          <Selector
            values={filter.value}
            name={filter.name}
            key={filter.id}
            id={filter.id}
            showTitle={!isQuick}
            className={classNameDesktop}
          />
        )
      case 'inline-multilist':
        return (
          <SelectorInline
            list={filter.value}
            key={filter.id}
            id={filter.id}
            name={filter.name}
            showTitle={!isQuick}
            className={classNameMobile}
          />
        )
      case 'range':
        return (
          <Range
            min={filter.value.min}
            max={filter.value.max}
            id={filter.id}
            name={filter.name}
            showTitle={!isQuick}
            className={classNameMobile}
          />
        )
      case 'toggle':
        return <Checkbox name={filter.name} id={filter.id} />
    }
  })
}
