'use client'
import React from 'react'
import { useStyleState } from '@/features/styleStates'
import { hideScroll, showScroll } from '@/features/scroll'

function RentButton() {
  const { toggleClass, hasAnyClass, removeClass } = useStyleState()

  const onClick = () => {
    toggleClass('rent-menu')
    hasAnyClass('rent-menu') ? showScroll() : hideScroll()
    removeClass('catalog-menu')
    removeClass('sale-menu')
  }

  return (
    <>
      <div onClick={onClick} className='cursor-pointer'>
        Аренда
      </div>
    </>
  )
}

export default RentButton
