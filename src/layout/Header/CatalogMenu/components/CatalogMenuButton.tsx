'use client'

import React from 'react'
import { useStyleState } from '@/features/styleStates'

function CatalogMenuButton() {
  const { toggleClass } = useStyleState()

  return (
    <button
      className='absolute right-0 top-1/2 flex -translate-y-1/2 items-center justify-center bg-base-300 circle-[36px] after:size-[18px] after:bg-icon-mobile-close after:bg-default'
      type='button'
      title='Закрыть'
      onClick={() => toggleClass('catalog-menu')}
    />
  )
}

export default CatalogMenuButton
