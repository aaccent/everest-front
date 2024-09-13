'use client'

import React, { useContext, useEffect, useState } from 'react'
import { PopupContext } from '@/features/visible/Popup'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'

interface Props {
  className?: string
  category: string
}

function DetailFilterButton({ className, category }: Props) {
  const { openPopup } = useContext(PopupContext)
  const { filter } = useCategoryFilter()
  const [count, setCount] = useState<number>(filter.parsed.length)
  useEffect(() => {
    setCount(filter.parsed.length)
  }, [filter])
  return (
    <div className='relative'>
      <div
        className={`text-base-500-reg-200 absolute right-[5px] top-[-5px] hidden items-center justify-center bg-primary text-base-100 circle-[24px] md:flex ${filter.parsed.length ? '' : 'md:hidden'}`}
      >
        {count}
      </div>
      <button
        className={`${className} flex size-[42px] items-center justify-center rounded-[12px] bg-base-100 p-[10px] after:size-[21px] after:bg-icon-filter after:bg-default`}
        type='button'
        onClick={() => openPopup({ name: 'filterPopup', args: { category } })}
      />
    </div>
  )
}

export default DetailFilterButton
