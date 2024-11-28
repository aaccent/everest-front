import React, { useState } from 'react'
import { Range as RangeType } from '@/types/FiltersType'
import { InputValue } from '@/globals/utilityTypes'
import { convertToShortView, getDigits } from '@/features/utility/price'

export type RangeValue = RangeType['value']

interface ValueDigits {
  min: 'тыс' | 'млн' | ''
  max: 'тыс' | 'млн' | ''
}

export type RangeProps = {
  name: string
  min: number
  max: number
  defaultValue?: RangeValue
  prefix?: string
  className?: string
  title: string
  showTitle?: boolean
  step?: number
} & InputValue<RangeValue>

function NewRange({
  name,
  min,
  max,
  prefix = '',
  className,
  title,
  showTitle,
  onChange,
  value: customValue,
  defaultValue = [min, max],
  step = 1,
}: RangeProps) {
  const [value, setValue] = useState<RangeValue>(customValue || defaultValue)

  const initValueDigits: ValueDigits = {
    min: getDigits(value[0]),
    max: getDigits(value[1]),
  }
  const [prePrefix, setPrePrefix] = useState<ValueDigits>(initValueDigits)

  function generalChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const defaultValue = e.target.defaultValue
    const regExp = /^\d+$/g
    const matches = Array.from(value.matchAll(regExp))[0]

    //console.log(matches)
  }

  //if (title === 'Стоимость') console.log({ prePrefix, value })

  return (
    <div className='flex flex-col gap-[8px]'>
      {showTitle && <div className='text-base-500-reg-100-upper hidden md:block'>{title}</div>}
      <div
        className={`text-base-400-lg-100 relative w-full min-w-[260px] rounded-[20px] border border-base-400 bg-base-100 px-[16px] py-[18px] md:max-w-[260px] md:rounded-[16px] md:px-[15px] md:py-[12px] ${className}`}
      >
        <input type='hidden' name={title} />
        <div className='text-base-400-lg-100 flex items-center justify-between'>
          <label>
            <input
              type='text'
              className='max w-full text-start focus:outline-0'
              defaultValue={convertToShortView(value[0])}
              onChange={generalChange}
              onFocus={(e) => (e.currentTarget.value = '')}
              onBlur={(e) => (e.currentTarget.value = convertToShortView(+e.currentTarget.value))}
            />
          </label>
          <div className='absolute inset-1/2 h-[12px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-base-400' />
          <label>
            <input
              type='text'
              className='min w-full text-end focus:outline-0'
              defaultValue={convertToShortView(value[1])}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default NewRange
