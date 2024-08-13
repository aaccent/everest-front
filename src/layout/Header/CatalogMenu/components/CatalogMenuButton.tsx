'use client'

import React, { useContext } from 'react'
import { toggleScroll } from '@/features/scroll'
import { HEADER_MENUS, HeaderContext } from '@/layout/Header/Header.context'

function CatalogMenuButton() {
  const header = useContext(HeaderContext)

  function clickHandler() {
    header.toggleMenu(HEADER_MENUS.CATALOG)
    toggleScroll()
  }

  return (
    <button
      className='absolute right-0 top-1/2 flex -translate-y-1/2 items-center justify-center bg-base-300 circle-[36px] after:size-[18px] after:bg-icon-mobile-close after:bg-default'
      type='button'
      title='Закрыть'
      onClick={clickHandler}
    />
  )
}

export default CatalogMenuButton
