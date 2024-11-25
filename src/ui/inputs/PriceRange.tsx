'use client'

import React from 'react'
import Range, { RangeProps, RangeValue } from '@/ui/inputs/Range'

function formatPartOfValue(value: number): number {
  return parseFloat((value / 1_000_000).toFixed(2))
}

function formatPrice(value: RangeValue | undefined): RangeValue | undefined {
  if (!value) return value

  return value.map(formatPartOfValue)
}

function revertPartOfValue(value: number): number {
  return Math.trunc(value * 1_000_000)
}

function revertPrice(value: RangeValue | undefined): RangeValue | undefined {
  if (!value) return value

  return value.map(revertPartOfValue)
}

type Props = Omit<RangeProps, 'step' | 'prefix'>

function PriceRange({ min, max, defaultValue, value, onChange, ...props }: Props) {
  const _onChange: Props['onChange'] = (name, value) => {
    if (onChange) onChange(name, revertPrice(value)!)
  }

  return (
    <Range
      {...props}
      onChange={_onChange}
      min={formatPartOfValue(min)}
      max={formatPartOfValue(max)}
      defaultValue={formatPrice(defaultValue)}
      value={formatPrice(value)}
      step={0.1}
      prefix='млн ₽'
    />
  )
}

export default PriceRange
