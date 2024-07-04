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
    <button className='w-full flex flex-col items-center gap-[4px]' type='button' onClick={onClick}>
      <span className='mt-[-20px] circle-[56px] flex justify-center items-center bg-primary after:size-[18px] after:bg-default after:bg-icon-catalog-btn after:filter-base-100' />
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
