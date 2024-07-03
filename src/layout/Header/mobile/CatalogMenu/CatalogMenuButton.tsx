'use client'

import React from 'react'
import { useStyleState } from '@/features/styleStates'

function CatalogMenuButton() {
  const { toggleClass } = useStyleState()

  return (
    <button
      className='absolute right-0 top-1/2 -translate-y-1/2 circle-[36px] bg-base-300 flex justify-center items-center after:size-[18px] after:bg-icon-mobile-close after:bg-default'
      type='button'
      title='Закрыть'
      onClick={() => toggleClass('catalog-menu')}
    />
  )
}

export default CatalogMenuButton
