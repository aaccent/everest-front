'use client'

import React, { useState } from 'react'

interface Props {
  name?: string
  list: Array<string | number>
  /** Индексы активных элементов при первой отрисовки компонента */
  initValue?: number[]
  className?: string
}

function SelectorInline({ name, list, initValue, className }: Props) {
  const [activeIndexes, setActiveIndexes] = useState<number[]>(initValue || [])

  const value = activeIndexes.map((index) => list[index]).join(',')

  function toggleActiveIndex(newValue: number) {
    setActiveIndexes((currentValue) => {
      const copyValue = [...currentValue]

      if (copyValue.includes(newValue)) {
        const targetIndex = copyValue.indexOf(newValue)
        return copyValue.toSpliced(targetIndex, 1)
      } else {
        copyValue.push(newValue)
        return copyValue
      }
    })
  }

  function showItems(list: Props['list']) {
    return list.map((value, i) => {
      const isActive = activeIndexes.includes(i)

      return (
        <button
          className={`text-base-400-lg-100 peer relative rounded-[14px] transition-colors before:absolute before:left-0 before:top-1/2 before:h-[12px] before:w-[1px] before:-translate-y-1/2 before:bg-base-400 before:transition-colors first-of-type:before:hidden hover:bg-base-300 hover:before:bg-transparent previous-has-[.active]:before:bg-transparent previous-has-[:hover]:before:bg-transparent md:px-[16.5px] md:py-[6px] ${isActive ? 'active bg-base-300 before:bg-transparent' : ''} w-full py-[10px]`}
          onClick={() => toggleActiveIndex(i)}
          type='button'
          key={i}
        >
          {value}
        </button>
      )
    })
  }

  return (
    <div
      className={`flex items-center justify-between rounded-[20px] bg-base-100 px-[8px] py-[7px] md:justify-normal md:gap-[2px] md:rounded-[16px] ${className}`}
    >
      <input type='hidden' name={name} value={value} onChange={() => {}} />
      {showItems(list)}
    </div>
  )
}

export default SelectorInline
