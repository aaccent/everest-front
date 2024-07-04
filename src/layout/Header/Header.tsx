import React from 'react'

import CatalogMenu from '@/layout/Header/CatalogMenu/CatalogMenu'
import MobileMenu from '@/layout/Header/mobile/MobileMenu'
import MobileHeader from '@/layout/Header/mobile/MobileHeader'
import MobileDetailMenu from '@/layout/Header/mobile/MobileDetailMenu'

import { IsMobile } from '@/features/adaptive'

/** @name {Header} */
function Header() {
  const whiteHeaderStyles = 'peer-[.is-white]/style-state:text-base-100'
  const blackHeaderStyles = 'peer-[.is-black]/style-state:text-base-600'

  return (
    <>
      <IsMobile>
        <MobileHeader className={`${whiteHeaderStyles} ${blackHeaderStyles}`} />
      </IsMobile>
      <CatalogMenu />
      <IsMobile>
        <MobileMenu />
        <MobileDetailMenu />
      </IsMobile>
    </>
  )
}

export default Header
