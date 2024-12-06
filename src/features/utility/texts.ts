import { FilterType } from '@/types/FiltersType'
import { convertPriceToShortView, getDigit } from '@/features/utility/price'
import React from 'react'

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
      const textValue = min === max ? max : ` ${min} - ${max}`
      return `${filter.name}: ${textValue}`
    case 'toggle':
      return `${filter.name}`
    default:
      return `${filter.name}: ${filter.value}`
  }
}

interface RenderHTMLProps {
  className?: string
}

export function renderHTML(rawHTML: string, props?: RenderHTMLProps) {
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML }, ...props })
}

export function capitalize(text: string) {
  return text.toLowerCase().replace(/[a-zA-Zа-яА-Я]/, String(text.at(0)?.toUpperCase()))
}

export function formatComplexName(rawName: string): string {
  const matchPrefix = /^ЖК /.test(rawName)
  const capitalized = capitalize(matchPrefix ? rawName.replace(/^ЖК /, '') : rawName)

  return matchPrefix ? `ЖК ${capitalized}` : capitalized
}
