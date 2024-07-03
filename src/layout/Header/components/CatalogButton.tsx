'use client'

import React from 'react'
import { useStyleState } from '@/features/styleStates'

function CatalogButton() {
  const { toggleClass } = useStyleState()

  return (
    <button
      className='w-full flex flex-col items-center gap-[4px]'
      type='button'
      onClick={() => toggleClass('catalog-menu')}
    >
      <span className='mt-[-20px] circle-[56px] flex justify-center items-center bg-primary after:size-[18px] after:bg-default after:bg-icon-catalog-btn after:filter-base-100' />
      Каталог
    </button>
  )
}

export default CatalogButton
