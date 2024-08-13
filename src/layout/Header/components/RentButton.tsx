'use client'
import React, { useContext } from 'react'
import { toggleScroll } from '@/features/scroll'
import { HEADER_MENUS, HeaderContext } from '@/layout/Header/Header.context'

function RentButton() {
  const header = useContext(HeaderContext)

  const onClick = () => {
    header.toggleMenu(HEADER_MENUS.RENT)
    toggleScroll()
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
