'use client'

import React, { PropsWithChildren, useEffect, useRef } from 'react'

interface Props extends PropsWithChildren {
  className: string
}

function CatalogMenuWrapper({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return

    const mobileMenu = document.querySelector<HTMLElement>('.mobile-menu')
    if (!mobileMenu) return

    ref.current.style.bottom = `${mobileMenu.offsetHeight}px`
  }, [])

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  )
}

export default CatalogMenuWrapper
