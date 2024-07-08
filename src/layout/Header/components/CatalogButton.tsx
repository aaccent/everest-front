'use client'

import React from 'react'
import { useStyleState } from '@/features/styleStates'
import { IsDesktop, IsMobile } from '@/features/adaptive'
import Button from '@/ui/buttons/Button'

interface ButtonProps {
  onClick: () => void
}

function MobileCatalogButton({ onClick }: ButtonProps) {
  return (
    <button className='flex w-full flex-col items-center gap-[4px]' type='button' onClick={onClick}>
      <span className='mt-[-20px] flex items-center justify-center bg-primary circle-[56px] after:size-[18px] after:bg-icon-catalog-btn after:filter-base-100 after:bg-default' />
      Каталог
    </button>
  )
}

function DesktopCatalogButton({ onClick }: ButtonProps) {
  return (
    <Button size='small' type='third' icon={{ img: 'CATALOG_BTN' }} onClick={onClick}>
      Каталог объектов
    </Button>
  )
}

function CatalogButton() {
  const { toggleClass } = useStyleState()

  function clickHandler() {
    toggleClass('catalog-menu')
  }

  return (
    <>
      <IsMobile>
        <MobileCatalogButton onClick={clickHandler} />
      </IsMobile>
      <IsDesktop>
        <DesktopCatalogButton onClick={clickHandler} />
      </IsDesktop>
    </>
  )
}

export default CatalogButton
