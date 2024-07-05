import React from 'react'
import { IsMobile } from '@/features/adaptive'
import MobileCatalogMenu from './MobileCatalogMenu'

function CatalogMenu() {
  return (
    <>
      <IsMobile>
        <MobileCatalogMenu />
      </IsMobile>
    </>
  )
}

export default CatalogMenu
