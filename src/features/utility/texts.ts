import { FilterType } from '@/types/FiltersType'
import { formatShortPriceArrForRange } from '@/features/utility/price'

interface Tag extends FilterType<any> {
  value: FilterType<any>['value'] | [number, number]
}

export function formatTagText(f: Tag) {
  switch (f.fieldType) {
    case 'range':
      const min =
        f.prefix === '₽'
          ? `${formatShortPriceArrForRange(f.value)[0]} млн ${f.prefix}`
          : `${f.value[0]} ${f.prefix || ''}`
      const max =
        f.prefix === '₽'
          ? `${formatShortPriceArrForRange(f.value)[1]} млн ${f.prefix}`
          : `${f.value[1]} ${f.prefix || ''}`
      return `${f.name}: ${min} - ${max}`
    case 'toggle':
      return `${f.name}`
    default:
      return `${f.name}: ${f.value}`
  }
}
