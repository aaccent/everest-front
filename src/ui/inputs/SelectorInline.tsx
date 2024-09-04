'use client'

import React, { useEffect, useState } from 'react'
import { useCategoryFilter } from '@/features/useCategoryFilter'

interface Props {
  id: number
  name: string
  showTitle: boolean
  list: Array<string | number>
  /** Индексы активных элементов при первой отрисовки компонента */
  initValue?: number[]
  className?: string
}

function SelectorInline({ name, list, initValue, className, id, showTitle }: Props) {
  const [activeIndexes, setActiveIndexes] = useState<number[]>(initValue || [])
  const { findFilter, addFilter, filter } = useCategoryFilter()

  function getIndex(item: string | number): number {
    return list.indexOf(item)
  }

  function getItem(index: number): number | string {
    return list[index]
  }

  useEffect(() => {
    const currentFilter = findFilter<{ id: number; value: string[] | number[] }>(id)
    if (currentFilter) {
      setActiveIndexes(currentFilter.value.map((item) => getIndex(item)))
    }
  }, [])

  useEffect(() => {
    if (!activeIndexes.length) return
    const filterItems = activeIndexes.map((index) => getItem(index))
    addFilter(id, filterItems)
  }, [activeIndexes])

  const value = activeIndexes.map((index) => getItem(index)).join(',')

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
      {showTitle && <div className='text-base-500-reg-100-upper'>{name}</div>}
      <div
        className={`flex w-full items-center justify-between rounded-[20px] bg-base-100 px-[8px] py-[7px] md:w-fit md:justify-normal md:gap-[2px] md:rounded-[16px] ${className}`}
      >
        <input type='hidden' name={name} value={value} onChange={() => {}} />
        {showItems(list)}
      </div>
    </div>
  )
}

export default SelectorInline
