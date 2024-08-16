'use client'
import React, { useContext } from 'react'
import { toggleScroll } from '@/features/scroll'
import { HeaderContext } from '@/layout/Header/Header.context'
import { MenuType } from '@/globals/api'

interface Props {
  type: MenuType
}

function SaleRentButton({ type }: Props) {
  const header = useContext(HeaderContext)

  const onClick = () => {
    header.toggleMenu(type)
    toggleScroll()
  }

  const text = type === 'rent' ? 'Аренда' : 'Продажа'

  return (
    <>
      <div onClick={onClick} className='cursor-pointer'>
        {text}
      </div>
    </>
  )
}

export default SaleRentButton
