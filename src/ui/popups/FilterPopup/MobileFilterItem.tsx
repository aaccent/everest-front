'use client'
import React, { useState } from 'react'
import { FilterType, FilterView } from '@/types/FiltersType'
import { FilterItems } from '@/components/FilterItems'

export interface FilterItemProps {
  filters: FilterType<FilterView>[]
  name: string
  count?: number
}

function MobileFilterItem({ filters, name, count = 0 }: FilterItemProps) {
  const [opened, setOpened] = useState(false)

  function showCount() {
    if (!count) return null

    return (
      <div className='ml-[8px] flex items-center justify-center bg-primary text-[10px] text-base-100 circle-[18px]'>
        {count}
      </div>
    )
  }

  return (
    <div className='border-b border-b-base-600/10 py-[18px] last:border-none'>
      <button
        className='text-base-100-reg-100 md:text-base-500-reg-100-upper flex w-full items-center text-base-600 after:ml-auto after:block after:size-[14px] after:bg-icon-triangle-arrow after:bg-default-contain md:after:rotate-90'
        onClick={() => setOpened(true)}
      >
        {name}
        {showCount()}
      </button>
      <div
        className={`absolute inset-x-0 top-0 z-10 block h-full rounded-[24px] bg-base-100 px-[20px] py-[24px] ${!opened && 'hidden'} flex flex-col`}
      >
        <div className='flex items-center gap-[88px]'>
          <div
            className='flex size-[36px] items-center justify-center rounded-full bg-base-300 after:block after:size-[18px] after:-rotate-90 after:bg-icon-arrow-up after:filter-base-600 after:bg-default-contain'
            onClick={() => setOpened(false)}
          />
          <div className='text-header-300'>{name}</div>
        </div>

        <div className='mt-[33px] flex h-1 grow flex-col gap-[18px] overflow-auto scrollbar-transparent'>
          <FilterItems filters={filters} />
        </div>
      </div>
    </div>
  )
}

export default MobileFilterItem
