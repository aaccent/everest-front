'use client'
import React from 'react'
import { useStyleState } from '@/features/styleStates'
import { hideScroll, showScroll } from '@/features/scroll'

function SaleButton() {
  const { toggleClass, hasAnyClass, removeClass } = useStyleState()

  const onClick = () => {
    toggleClass('sale-menu')
    hasAnyClass('sale-menu') ? showScroll() : hideScroll()
    removeClass('catalog-menu')
    removeClass('rent-menu')
  }

  return (
    <>
      <div onClick={onClick} className='cursor-pointer'>
        Покупка
      </div>
    </>
  )
}

export default SaleButton
