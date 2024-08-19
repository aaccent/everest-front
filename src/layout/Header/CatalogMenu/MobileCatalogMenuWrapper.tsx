'use client'

import React, { PropsWithChildren, useContext, useEffect, useRef } from 'react'
import { HEADER_MENUS, HeaderContext } from '@/layout/Header/Header.context'

interface Props extends PropsWithChildren {
  className: string
}

/** @description Нужен для того, чтобы хранить кнопку открытия/закрытия в клиентском компоненте */
function MobileCatalogMenuWrapper({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const header = useContext(HeaderContext)

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return

    const mobileMenu = document.querySelector<HTMLElement>('.mobile-menu')
    if (!mobileMenu) return

    ref.current.style.bottom = `${mobileMenu.offsetHeight}px`
  }, [])

  return (
    <div className={className} ref={ref}>
      <div className='absolute inset-0 bg-[#000]/60' onClick={() => header.setMenu(HEADER_MENUS.CATALOG)} />
      {children}
    </div>
  )
}

export default MobileCatalogMenuWrapper
