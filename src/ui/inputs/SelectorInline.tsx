'use client'

import React, { useState } from 'react'
import { Props as SelectorProps, SelectorValue } from '@/ui/inputs/Selector'

type Props = Omit<SelectorProps, 'isRadio'>

function SelectorInline({
  title,
  list,
  defaultValue = [],
  className,
  name,
  showTitle,
  value: customValue,
  onChange,
}: Props) {
  const [value, setValue] = useState<SelectorValue>(defaultValue)

  const _value = customValue || value

  function _setValue(changeFn: (prev: SelectorValue) => SelectorValue) {
    if (customValue) {
      onChange?.(name, changeFn(_value))
    } else {
      setValue((prev) => {
        const newValue = changeFn(prev)
        onChange?.(name, newValue)
        return newValue
      })
    }
  }

  const toggleValue = (newValue: string | number) => {
    _setValue((prev) => {
      const valueSet = new Set(prev)

      if (valueSet.has(newValue)) {
        valueSet.delete(newValue)
      } else {
        valueSet.add(newValue)
      }

      return Array.from(valueSet)
    })
  }

  function showItems(list: Props['list']) {
    return list.map((value, i) => {
      const isActive = _value.includes(value)

      return (
        <button
          className={`text-base-400-lg-100 peer relative rounded-[14px] transition-colors before:absolute before:left-0 before:top-1/2 before:h-[12px] before:w-[1px] before:-translate-y-1/2 before:bg-base-400 before:transition-colors first-of-type:before:hidden hover:bg-base-300 hover:before:bg-transparent previous-has-[.active]:before:bg-transparent previous-has-[:hover]:before:bg-transparent md:px-[16.5px] md:py-[6px] ${isActive ? 'active bg-base-300 before:bg-transparent' : ''} w-full text-nowrap py-[10px]`}
          onClick={() => toggleValue(value)}
          type='button'
          key={i}
        >
          {value}
        </button>
      )
    })
  }

  return (
    <div className='flex flex-col gap-[8px]'>
      {showTitle && <div className='text-base-500-reg-100-upper hidden md:flex'>{title}</div>}
      <div
        className={`flex w-full items-center justify-between rounded-[20px] border border-base-400 bg-base-100 px-[8px] py-[7px] md:w-fit md:justify-normal md:gap-[2px] md:rounded-[16px] ${className}`}
      >
        <input type='hidden' name={title} value={value.join(',')} onChange={() => {}} />
        {showItems(list)}
      </div>
    </div>
  )
}

export default SelectorInline
