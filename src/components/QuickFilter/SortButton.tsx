'use client'
import React, { useEffect, useState } from 'react'
import { Sort } from '@/types/FiltersType'
import { useCategorySort } from '@/features/catalog/useCategorySort'

interface SortButtonProps {
  sorts: Sort[]
}

function SortButton({ sorts }: SortButtonProps) {
  const [sortValue, setSortValue] = useState<string>('')
  const [opened, setOpened] = useState<boolean>(false)
  const { addSort, getSortFromUrl } = useCategorySort()

  useEffect(() => {
    const currentValue = sorts.find((item) => item.value === getSortFromUrl())
    setSortValue(currentValue?.name || sorts[0].name)
  }, [])

  function clickHandle(sort: Sort) {
    if (sort.value === 'default') {
      addSort(null)
    } else {
      addSort(sort.value)
    }
    setSortValue(sort.name)
    setOpened(false)
  }

  function showSorts() {
    return sorts.map((sort, index) => (
      <button key={index} onClick={() => clickHandle(sort)}>
        {sort.name}
      </button>
    ))
  }

  return (
    <div className='text-base-500-reg-100-upper relative'>
      <span className='mr-[6px] text-base-600/50'>Сортировка:</span>
      <button
        className='text-base-500-reg-100-upper'
        onClick={() => {
          setOpened((prev) => !prev)
        }}
      >
        {sortValue}
      </button>
      <div className={`absolute z-10 flex-col bg-base-100 ${opened ? 'flex' : 'hidden'}`}>{showSorts()}</div>
    </div>
  )
}

export default SortButton
