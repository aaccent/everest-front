'use client'

import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { useStyleState } from '@/features/styleStates'

interface Props extends PropsWithChildren {
  className: string
}

function MobileCatalogMenuWrapper({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { toggleClass } = useStyleState()

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return

    const mobileMenu = document.querySelector<HTMLElement>('.mobile-menu')
    if (!mobileMenu) return

    ref.current.style.bottom = `${mobileMenu.offsetHeight}px`
  }, [])

  return (
    <div className={className} ref={ref}>
      <div className='absolute inset-0 bg-[#000]/[.6]' onClick={() => toggleClass('catalog-menu')} />
      {children}
    </div>
  )
}

export default MobileCatalogMenuWrapper
