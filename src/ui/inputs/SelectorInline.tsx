'use client'

import React, { useState } from 'react'

interface Props {
  id: number
  name: string
  showTitle: boolean
  list: Array<string | number>
  /** Индексы активных элементов при первой отрисовки компонента */
  initValue?: number[]
  className?: string
  customValue?: {
    value: number[]
    setValue: (id: number, value: (string | number)[]) => void
  }
}

function SelectorInline({ name, list, initValue, className, id, showTitle, customValue }: Props) {
  const [activeIndexes, setActiveIndexes] = useState<number[]>(initValue || [])

  const _activeIndexes = customValue ? customValue.value : activeIndexes
  const _setActiveIndexes = (value: number[] | (() => number[])) => {
    if (customValue) {
      const newValueIndexes = typeof value === 'function' ? value() : value
      const newValues = newValueIndexes.map((index) => list[index])
      customValue.setValue(id, newValues)
    } else {
      setActiveIndexes(value)
    }
  }

  const value = _activeIndexes.map((index) => activeIndexes[index]).join(',')

  function toggleActiveIndex(newValueIndex: number) {
    const copyValue = [..._activeIndexes]
    _setActiveIndexes(() => {
      if (copyValue.includes(newValueIndex)) {
        const targetIndex = copyValue.indexOf(newValueIndex)
        return copyValue.toSpliced(targetIndex, 1)
      } else {
        copyValue.push(newValueIndex)
        return copyValue
      }
    })
  }

  function showItems(list: Props['list']) {
    return list.map((value, i) => {
      const isActive = _activeIndexes.includes(i)

      return (
        <button
          className={`text-base-400-lg-100 peer relative rounded-[14px] transition-colors before:absolute before:left-0 before:top-1/2 before:h-[12px] before:w-[1px] before:-translate-y-1/2 before:bg-base-400 before:transition-colors first-of-type:before:hidden hover:bg-base-300 hover:before:bg-transparent previous-has-[.active]:before:bg-transparent previous-has-[:hover]:before:bg-transparent md:px-[16.5px] md:py-[6px] ${isActive ? 'active bg-base-300 before:bg-transparent' : ''} w-full text-nowrap py-[10px]`}
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
    <div className='flex flex-col gap-[8px]'>
      {showTitle && <div className='text-base-500-reg-100-upper hidden md:flex'>{name}</div>}
      <div
        className={`flex w-full items-center justify-between rounded-[20px] border border-base-400 bg-base-100 px-[8px] py-[7px] md:w-fit md:justify-normal md:gap-[2px] md:rounded-[16px] ${className}`}
      >
        <input type='hidden' name={name} value={value} onChange={() => {}} />
        {showItems(list)}
      </div>
    </div>
  )
}

export default SelectorInline
