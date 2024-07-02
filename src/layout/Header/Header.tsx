import React from 'react'
import HeaderState from './HeaderState'
import MobileHeader from '@/layout/Header/MobileHeader'
import MobileMenu from '@/layout/Header/MobileMenu'

/** @name {Header} */
function Header() {
  const whiteHeaderStyles = 'peer-[.is-white]/header-color:text-base-100'
  const blackHeaderStyles = 'peer-[.is-black]/header-color:text-base-600'

  return (
    <>
      <HeaderState />
      <MobileHeader className={`${whiteHeaderStyles} ${blackHeaderStyles}`} />
      <MobileMenu />
    </>
  )
}

export default Header
