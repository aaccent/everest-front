import React from 'react'
import MobileHeader from '@/layout/Header/MobileHeader'
import MobileMenu from '@/layout/Header/MobileMenu'
import MobileDetailMenu from '@/layout/Header/MobileDetailMenu/MobileDetailMenu'
import StyleStates from '@/features/styleStates'

/** @name {Header} */
function Header() {
  const whiteHeaderStyles = 'peer-[.is-white]/style-state:text-base-100'
  const blackHeaderStyles = 'peer-[.is-black]/style-state:text-base-600'

  return (
    <>
      <StyleStates />
      <header className={`${whiteHeaderStyles} ${blackHeaderStyles}`}>
        <MobileHeader />
      </header>
      <MobileMenu />
      <MobileDetailMenu />
    </>
  )
}

export default Header
