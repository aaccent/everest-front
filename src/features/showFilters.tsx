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
            list={filter.value ? filter.value : [1, 2, 2]}
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
            min={filter.value ? filter.value.min : 0}
            max={filter.value ? filter.value.max : 0}
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
