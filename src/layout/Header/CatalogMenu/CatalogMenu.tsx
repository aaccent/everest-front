import React from 'react'
import { IsDesktop, IsMobile } from '@/features/visible/adaptive'
import MobileCatalogMenu from './MobileCatalogMenu'
import DesktopCatalogMenu from '@/layout/Header/CatalogMenu/DesktopCatalogMenu'

function CatalogMenu() {
  return (
    <>
      <IsMobile>
        <MobileCatalogMenu />
      </IsMobile>
      <IsDesktop>
        <DesktopCatalogMenu />
      </IsDesktop>
    </>
  )
}

export default CatalogMenu
