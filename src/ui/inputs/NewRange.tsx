import React, { useState } from 'react'
import { Range as RangeType } from '@/types/FiltersType'
import { InputValue } from '@/globals/utilityTypes'
import { convertPriceToFullView, convertPriceToShortView, formatInput, getDigits } from '@/features/utility/price'

export type RangeValue = RangeType['value']

export type PriceDigits = 'тыс' | 'млн' | ''

interface ValueDigits {
  min: PriceDigits
  max: PriceDigits
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

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.currentTarget.value = formatInput(e.currentTarget.value)
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    const numberPart = parseFloat(e.currentTarget.value)
    const name = e.currentTarget.name as 'min' | 'max'
    const digitPart = prePrefix[name]
    e.currentTarget.value = convertPriceToFullView(numberPart, digitPart).toString()
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    const inputValue = e.currentTarget.value
    //console.log({ inputValue, value })
    e.currentTarget.value = convertPriceToShortView(parseFloat(inputValue))
  }

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
              defaultValue={convertPriceToShortView(value[0])}
              onChange={onInputChange}
              onFocus={onFocus}
              onBlur={onBlur}
              name='min'
            />
          </label>
          <div className='absolute inset-1/2 h-[12px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-base-400' />
          <label>
            <input
              type='text'
              className='min w-full text-end focus:outline-0'
              defaultValue={convertPriceToShortView(value[1])}
              onChange={onInputChange}
              onFocus={onFocus}
              onBlur={onBlur}
              name='max'
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default NewRange
