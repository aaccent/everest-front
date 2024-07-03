'use client'
import React from 'react'
import { useStyleState } from '@/features/styleStates'

function MenuButton() {
  const { toggleClass } = useStyleState()

  return (
    <button
      onClick={() => toggleClass('menu-open')}
      className='circle-[36px] flex flex-col gap-[4px] justify-center items-center bg-base-115 transition-colors peer-any-parent-[:is(.is-scrolled,.menu-open)]/style-state:bg-base-300'
      type='button'
      title='Меню'
    >
      <span className='size-[20px] flex flex-col gap-[4px] justify-center pseudo:relative pseudo:h-[1.8px] before:left-[1px] after:left-[1px] before:w-[18px] pseudo:block pseudo:bg-base-100 after:w-[14px] transition-colors peer-any-parent-[:is(.is-scrolled,.menu-open)]/style-state:pseudo:bg-base-600' />
    </button>
  )
}

export default MenuButton
