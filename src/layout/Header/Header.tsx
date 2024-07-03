import React from 'react'
import MobileHeader from '@/layout/Header/mobile/MobileHeader'
import MobileMenu from '@/layout/Header/mobile/MobileMenu'
import MobileDetailMenu from '@/layout/Header/mobile/MobileDetailMenu/MobileDetailMenu'
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
