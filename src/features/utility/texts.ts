import { FilterType } from '@/types/FiltersType'
import { formatShortPriceForRange } from '@/features/utility/price'

interface Tag extends FilterType<any> {
  value: FilterType<any>['value'] | [number, number]
}

function selectDigitsName(value: number) {
  const digits = Math.trunc(value).toString().length
  if (digits > 6) return 'млн'
  if (digits > 3) return 'тыс'
  return ''
}

export function formatTagText(f: Tag) {
  switch (f.fieldType) {
    case 'range':
      const min =
        f.prefix === '₽'
          ? `${formatShortPriceForRange(f.value)[0].toFixed(2)} ${selectDigitsName(f.value[0])} ${f.prefix}`
          : `${f.value[0]} ${f.prefix || ''}`
      const max =
        f.prefix === '₽'
          ? `${formatShortPriceForRange(f.value)[1].toFixed(2)} ${selectDigitsName(f.value[1])} ${f.prefix}`
          : `${f.value[1]} ${f.prefix || ''}`
      return `${f.name}: ${min} - ${max}`
    case 'toggle':
      return `${f.name}`
    default:
      return `${f.name}: ${f.value}`
  }
}
