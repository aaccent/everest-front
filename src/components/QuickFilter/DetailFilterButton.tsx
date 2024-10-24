'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useFilter } from '@/features/useFilter'
import FilterPopup from '@/ui/popups/FilterPopup/FilterPopup'
import { PopupContext } from '@/features/Popup'
import { QuickFilters } from '@/types/FiltersType'

interface Props {
  className?: string
  categoryName: string
  quickFilters: QuickFilters
}

function DetailFilterButton({ className, categoryName, quickFilters }: Props) {
  const { filter } = useFilter()
  const [count, setCount] = useState<number>(filter.parsed.length)
  const { openDynamicPopup } = useContext(PopupContext)

  useEffect(() => {
    setCount(filter.parsed.length)
  }, [filter])
  return (
    <div className='relative mr-[16px]'>
      <div
        className={`text-base-500-reg-200 absolute right-[5px] top-[-5px] hidden items-center justify-center bg-primary text-base-100 circle-[24px] md:flex ${filter.parsed.length ? '' : 'md:hidden'}`}
      >
        {count}
      </div>
      <button
        className={`${className} flex size-[42px] items-center justify-center rounded-[12px] bg-base-100 p-[10px] after:size-[21px] after:bg-icon-filter after:bg-default`}
        type='button'
        onClick={() => openDynamicPopup('filterPopup')}
      />
      <FilterPopup category={categoryName} quickFilters={quickFilters} />
    </div>
  )
}

export default DetailFilterButton
