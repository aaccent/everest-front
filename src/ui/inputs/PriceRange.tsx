import React from 'react'
import Range, { RangeProps, RangeValue } from '@/ui/inputs/Range'

type PriceRangeProps = Omit<RangeProps, 'step' | 'customValue'> &
  Required<Pick<RangeProps, 'value' | 'onChange' | 'name'>>

function PriceRange({ value, onChange, name, ...props }: PriceRangeProps) {
  const _value = {
    min: value.min / 1_000_000,
    max: value.max / 1_000_000,
  }

  const fn = (_: string, value: RangeValue) => {
    onChange(name, { min: _value.min * 1_000_000, max: _value.max * 1_000_000 })
  }

  return (
    <Range
      title=''
      min={props.min / 1_000_000}
      max={props.max / 1_000_000}
      onChange={fn}
      defaultValue={_value}
      value={_value}
      name={name}
    />
  )
}

export default PriceRange
