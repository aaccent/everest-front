'use client'

import React, { useContext } from 'react'
import { IsDesktop, IsMobile } from '@/features/adaptive'
import Button, { ButtonVariation } from '@/ui/buttons/Button'
import { toggleScroll } from '@/features/scroll'
import { HEADER_MENUS, HeaderContext } from '@/layout/Header/Header.context'
import { usePathname } from 'next/navigation'

interface ButtonProps {
  toggleMenu?: () => void
}

function MobileCatalogButton({ toggleMenu }: ButtonProps) {
  return (
    <button className='flex w-full flex-col items-center gap-[4px]' type='button' onClick={toggleMenu}>
      <span className='mt-[-20px] flex items-center justify-center bg-primary circle-[56px] after:size-[18px] after:bg-icon-catalog-btn after:filter-base-100 after:bg-default' />
      Каталог
    </button>
  )
}

function DesktopCatalogButton({ toggleMenu }: ButtonProps) {
  const pathName = usePathname()
  const header = useContext(HeaderContext)
  const className = header.hasMenu(HEADER_MENUS.CATALOG) ? 'after:bg-icon-mobile-close' : 'after:bg-icon-catalog-btn'

  let type: ButtonVariation = 'third'

  if (pathName !== '/' || header.scrolled) {
    type = 'primary'
  }

  if (header.hasMenu(HEADER_MENUS.CATALOG)) {
    type = 'second'
  }

  return (
    <Button className={className} size='small' variation={type} icon={{ img: 'CATALOG_BTN' }} onClick={toggleMenu}>
      Каталог объектов
    </Button>
  )
}

function CatalogButton() {
  const header = useContext(HeaderContext)

  function toggleMenu() {
    if (header.hasMenu(HEADER_MENUS.CATALOG)) {
      header.setMenu(null)
    } else {
      header.setMenu(HEADER_MENUS.CATALOG)
    }
    toggleScroll()
  }

  return (
    <>
      <IsMobile>
        <MobileCatalogButton toggleMenu={toggleMenu} />
      </IsMobile>
      <IsDesktop>
        <DesktopCatalogButton toggleMenu={toggleMenu} />
      </IsDesktop>
    </>
  )
}

export default CatalogButton
