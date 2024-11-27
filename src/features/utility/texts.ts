import { FilterType } from '@/types/FiltersType'
import { formatPriceForRange } from '@/features/utility/price'

interface Tag extends FilterType<any> {
  value: FilterType<any>['value'] | [number, number]
}

function selectDigitsName(value: number) {
  if (value >= 1_000_000) return 'млн'
  if (value < 1_000_000) return 'тыс'
  return ''
}

function formatPriceValue(value: number) {
  return `${formatPriceForRange(value)} ${selectDigitsName(value)} ₽`
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
