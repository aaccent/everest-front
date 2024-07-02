import React from 'react'
import MobileHeader from '@/layout/Header/MobileHeader'
import MobileMenu from '@/layout/Header/MobileMenu'
import MobileDetailMenu from '@/layout/Header/MobileDetailMenu'
import StyleStates from '@/features/styleStates'

/** @name {Header} */
function Header() {
  const whiteHeaderStyles = 'peer-[.is-white]/style-state:text-base-100'
  const blackHeaderStyles = 'peer-[.is-black]/style-state:text-base-600'

  return (
    <>
      <StyleStates />
      <MobileHeader className={`${whiteHeaderStyles} ${blackHeaderStyles}`} />
      <MobileMenu />
      <MobileDetailMenu />
    </>
  )
}

export default Header
