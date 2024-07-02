'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useScroll } from '@/features/scroll'

/** @description Выставляет классы div элементу на основе location.path и полосе прокрутки.
 * Компонент [Header]{@link Header} на основе классов div'а меняет свои стили */
function HeaderState() {
  const pathname = usePathname()
  const { scrollPos } = useScroll()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (scrollPos >= 20) ref.current?.classList.add('is-scrolled')
    else ref.current?.classList.remove('is-scrolled')
  }, [scrollPos])

  const className = [
    // prettier-ignore
    pathname === '/' ? 'is-white' : 'is-black',
  ].join(' ')

  return <div className={`peer/header-color ${className}`} ref={ref} />
}

export default HeaderState
