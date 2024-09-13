'use client'
import React, { useContext } from 'react'
import { toggleScroll } from '@/features/visible/scroll'
import { HEADER_MENUS, HeaderContext } from '@/layout/Header/Header.context'

function MobileMenuButton() {
  const header = useContext(HeaderContext)

  function clickHandler() {
    header.toggleMenu(HEADER_MENUS.MOBILE)
    toggleScroll()
  }

  return (
    <button
      onClick={clickHandler}
      className='flex flex-col items-center justify-center gap-[4px] bg-base-115 transition-colors circle-[36px] after:size-[20px] after:bg-icon-mobile-menu after:transition-[filter] after:bg-default peer-any-parent-[.is-black]/header-state:bg-base-300 peer-any-parent-[[data-menu="mobile"]]/header-state:after:size-[18px] peer-any-parent-[[data-menu="mobile"]]/header-state:after:bg-icon-mobile-close peer-any-parent-[.is-black]/header-state:after:filter-base-600'
      type='button'
      title='Меню'
    />
  )
}

export default MobileMenuButton
