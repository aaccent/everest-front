'use client'
import React from 'react'
import { useStyleState } from '@/features/styleStates'

function MobileMenuButton() {
  const { toggleClass } = useStyleState()

  return (
    <button
      onClick={() => toggleClass('menu-open')}
      className='circle-[36px] flex flex-col gap-[4px] justify-center items-center bg-base-115 transition-colors peer-any-parent-[:is(.is-scrolled,.menu-open)]/style-state:bg-base-300 after:size-[20px] after:bg-default after:bg-icon-mobile-menu after:transition-[filter] peer-any-parent-[:is(.is-scrolled,.menu-open)]/style-state:after:filter-base-600 peer-any-parent-[.menu-open]/style-state:after:size-[18px] peer-any-parent-[.menu-open]/style-state:after:bg-icon-mobile-close'
      type='button'
      title='Меню'
    />
  )
}

export default MobileMenuButton
