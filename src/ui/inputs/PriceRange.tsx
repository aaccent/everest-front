import React, { useMemo } from 'react'
import Range, { RangeProps } from '@/ui/inputs/Range'

type PriceRangeProps = Omit<RangeProps, 'step' | 'units' | 'customValue'> & Required<Pick<RangeProps, 'customValue'>>

function PriceRange({ customValue, ...props }: PriceRangeProps) {
  const getValue = useMemo(
    function () {
      return {
        min: customValue.value.min / 1_000_000,
        max: customValue.value.max / 1_000_000,
      }
    },
    [customValue.value.min, customValue.value.max],
  )

  const fn = (_: number, value: [number, number]) => {
    customValue?.setValue(_, [value[0] * 1_000_000, value[1] * 1_000_000])
  }

  return <Range {...props} units='млн.₽' customValue={{ value: getValue, setValue: fn }} />
}

export default PriceRange
