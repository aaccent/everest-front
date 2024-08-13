'use client'
import React, { useContext } from 'react'
import { toggleScroll } from '@/features/scroll'
import { HEADER_MENUS, HeaderContext } from '@/layout/Header/Header.context'

function SaleButton() {
  const header = useContext(HeaderContext)

  const onClick = () => {
    header.toggleMenu(HEADER_MENUS.SALE)
    toggleScroll()
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
