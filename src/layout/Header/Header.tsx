import React from 'react'

import CatalogMenu from '@/layout/Header/CatalogMenu/CatalogMenu'
import MobileMenu from '@/layout/Header/mobile/MobileMenu'
import MobileHeader from '@/layout/Header/mobile/MobileHeader'
import MobileDetailMenu from '@/layout/Header/mobile/MobileDetailMenu'

import { HeaderProvider } from '@/layout/Header/Header.context'
import { getPathname } from '@/features/pathname'
import { IsDesktop, IsMobile } from '@/features/adaptive'
import DesktopHeader from '@/layout/Header/desktop/DesktopHeader'
import DesktopSaleRentMenu from '@/layout/Header/SaleRentMenu/DesktopSaleRentMenu'
import BlackZone from '@/layout/Header/components/BlackZone'

/** @name {Header} */
function Header() {
  return (
    <HeaderProvider pathname={getPathname() || ''}>
      <IsMobile>
        <MobileHeader />
      </IsMobile>
      <IsDesktop>
        <DesktopHeader />
      </IsDesktop>
      <CatalogMenu />
      <DesktopSaleRentMenu className='peer-[[data-menu="sale"]]/header-state:flex' menuType='sale' />
      <DesktopSaleRentMenu className='peer-[[data-menu="rent"]]/header-state:flex' menuType='rent' />
      <IsMobile>
        <MobileMenu />
        <MobileDetailMenu />
      </IsMobile>
      <BlackZone />
    </HeaderProvider>
  )
}

export default Header
