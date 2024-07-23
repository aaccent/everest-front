'use client'

import React from 'react'
import { useStyleState } from '@/features/styleStates'
import { IsDesktop, IsMobile } from '@/features/adaptive'
import Button, { ButtonVariation } from '@/ui/buttons/Button'
import { hideScroll, showScroll, toggleScroll } from '@/features/scroll'

interface ButtonProps {
  openMenu?: () => void
  closeMenu?: () => void
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

function DesktopCatalogButton({ openMenu, closeMenu }: ButtonProps) {
  const { hasAnyClass } = useStyleState()

  const className = hasAnyClass('catalog-menu') ? 'after:bg-icon-mobile-close' : 'after:bg-icon-catalog-btn'

  let type: ButtonVariation = 'third'

  if (hasAnyClass('is-black')) {
    type = 'primary'
  }

  if (hasAnyClass('catalog-menu', 'is-scrolled')) {
    type = 'second'
  }

  return (
    <Button
      className={className}
      size='small'
      variation={type}
      icon={{ img: 'CATALOG_BTN' }}
      onClick={closeMenu}
      onMouseEnter={openMenu}
    >
      Каталог объектов
    </Button>
  )
}

function CatalogButton() {
  const { toggleClass, removeClass, addClass } = useStyleState()

  function toggleMenu() {
    toggleClass('catalog-menu')
    toggleScroll()
  }

  function openMenu() {
    addClass('catalog-menu')
    hideScroll()
  }

  function closeMenu() {
    removeClass('catalog-menu')
    showScroll()
  }

  return (
    <>
      <IsMobile>
        <MobileCatalogButton toggleMenu={toggleMenu} />
      </IsMobile>
      <IsDesktop>
        <DesktopCatalogButton closeMenu={closeMenu} openMenu={openMenu} />
      </IsDesktop>
    </>
  )
}

export default CatalogButton
