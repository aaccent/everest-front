'use client'
import React, { useState } from 'react'
import { FilterType, FilterView } from '@/types/FiltersType'
import { showFilterItems } from '@/features/showFilters'

export interface FilterItemProps {
  filters: FilterType<FilterView>[]
  name: string
}

function MobileFilterItem({ filters, name }: FilterItemProps) {
  const [opened, setOpened] = useState(false)

  return (
    <div className='md:hidden'>
      <div
        className='text-base-100-reg-100 md:text-base-500-reg-100-upper flex items-center justify-between pb-[18px] text-base-600 after:block after:size-[14px] after:bg-icon-triangle-arrow after:bg-default-contain md:after:rotate-90'
        onClick={() => setOpened(true)}
      >
        {name}
      </div>
      <div
        className={`absolute inset-0 z-10 rounded-[24px] bg-base-100 px-[20px] py-[24px] ${!opened && 'invisible opacity-0'}`}
      >
        <div className='flex items-center gap-[88px]'>
          <div
            className='flex size-[36px] items-center justify-center rounded-full bg-base-300 after:block after:size-[18px] after:-rotate-90 after:bg-icon-arrow-up after:filter-base-600 after:bg-default-contain'
            onClick={() => setOpened(false)}
          />
          <div className='text-header-300'>{name}</div>
        </div>

        <div className='mt-[33px] flex flex-col gap-[18px]'>{showFilterItems(filters)}</div>
      </div>
    </div>
  )
}

export default MobileFilterItem
