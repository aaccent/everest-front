import React from 'react'

import CatalogMenu from '@/layout/Header/CatalogMenu/CatalogMenu'
import MobileMenu from '@/layout/Header/mobile/MobileMenu'
import MobileHeader from '@/layout/Header/mobile/MobileHeader'
import MobileDetailMenu from '@/layout/Header/mobile/MobileDetailMenu'

import { IsDesktop, IsMobile } from '@/features/adaptive'
import DesktopHeader from '@/layout/Header/desktop/DesktopHeader'
import DesktopSaleRentMenu from '@/layout/Header/SaleRentMenu/DesktopSaleRentMenu'

/** @name {Header} */
function Header() {
  const whiteHeaderStyles = 'peer-[.is-white]/style-state:text-base-100'
  const blackHeaderStyles = 'peer-[.is-black]/style-state:text-base-600'

  return (
    <>
      <IsMobile>
        <MobileHeader className={`${whiteHeaderStyles} ${blackHeaderStyles}`} />
      </IsMobile>
      <IsDesktop>
        <DesktopHeader className={`${whiteHeaderStyles} ${blackHeaderStyles}`} />
      </IsDesktop>
      <CatalogMenu />
      <DesktopSaleRentMenu className='peer-[:is(.sale-menu)]/style-state:flex' category='sale' />
      <DesktopSaleRentMenu className='peer-[:is(.rent-menu)]/style-state:flex' category='rent' />
      <IsMobile>
        <MobileMenu />
        <MobileDetailMenu />
      </IsMobile>
    </>
  )
}

export default Header
