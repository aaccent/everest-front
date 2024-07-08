'use client'
import React from 'react'
import { useStyleState } from '@/features/styleStates'

function MobileMenuButton() {
  const { toggleClass } = useStyleState()

  return (
    <button
      onClick={() => toggleClass('menu-open')}
      className='flex flex-col items-center justify-center gap-[4px] bg-base-115 transition-colors circle-[36px] after:size-[20px] after:bg-icon-mobile-menu after:transition-[filter] after:bg-default peer-any-parent-[:is(.is-scrolled,.menu-open)]/style-state:bg-base-300 peer-any-parent-[.menu-open]/style-state:after:size-[18px] peer-any-parent-[.menu-open]/style-state:after:bg-icon-mobile-close peer-any-parent-[:is(.is-scrolled,.menu-open)]/style-state:after:filter-base-600'
      type='button'
      title='Меню'
    />
  )
}

export default MobileMenuButton
