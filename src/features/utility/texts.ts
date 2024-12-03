import { FilterType } from '@/types/FiltersType'
import { convertPriceToShortView, getDigit } from '@/features/utility/price'

interface Tag extends FilterType<any> {
  value: FilterType<any>['value'] | [number, number]
}

function formatPriceValue(value: number) {
  return `${convertPriceToShortView(value)} ${getDigit(value)} ₽`
}

export function formatTagText(filter: Tag) {
  switch (filter.fieldType) {
    case 'range':
      const min =
        filter.prefix === '₽' ? formatPriceValue(filter.value[0]) : `${filter.value[0]} ${filter.prefix || ''}`
      const max =
        filter.prefix === '₽' ? formatPriceValue(filter.value[1]) : `${filter.value[1]} ${filter.prefix || ''}`
      return `${filter.name}: ${min} - ${max}`
    case 'toggle':
      return `${filter.name}`
    default:
      return `${filter.name}: ${filter.value}`
  }
}
