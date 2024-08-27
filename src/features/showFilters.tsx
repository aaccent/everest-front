import { FilterType, FilterView } from '@/types/FiltersType'
import Selector from '@/ui/inputs/Selector'
import SelectorInline from '@/ui/inputs/SelectorInline'
import { formatPriceShortBy } from '@/features/price'
import Range from '@/ui/inputs/Range'
import Checkbox from '@/ui/inputs/Checkbox'
import React from 'react'

/** @param filters Полученный от бэкенда массив фильтров
 * @param isQuick  Булево значение, необходимо для показа или скрытия заголовка поля фильтра
 * @return Компонент поля  */

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
            list={filter.value}
            key={filter.id}
            id={filter.id}
            name={filter.name}
            showTitle={!isQuick}
            className={classNameMobile}
          />
        )
      case 'range':
        const isPrice = filter.name === 'Стоимость'
        const min = isPrice ? +formatPriceShortBy(filter.value.min, true) : filter.value.min
        const max = isPrice ? +formatPriceShortBy(filter.value.max, true) : filter.value.max
        return (
          <Range
            min={min}
            max={max}
            id={filter.id}
            key={filter.id}
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
