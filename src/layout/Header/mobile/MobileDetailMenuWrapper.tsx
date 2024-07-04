'use client'

import React, { PropsWithChildren, useEffect, useRef } from 'react'

interface Props extends PropsWithChildren {
  className: string
}

function MobileDetailMenuWrapper({ className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const header = document.querySelector<HTMLElement>('.header')
    if (!header) return
    ref.current.style.height = `calc(100% - ${header.offsetHeight}px)`

    const mobileMenu = document.querySelector<HTMLElement>('.mobile-menu')
    if (!mobileMenu) return
    ref.current.style.paddingBottom = `${mobileMenu.offsetHeight}px`
  }, [])

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  )
}

export default MobileDetailMenuWrapper
