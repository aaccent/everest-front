'use client'

import React, { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useScroll } from '@/features/scroll'

export function useStyleState() {
  function toggleClass(name: string) {
    if (typeof window === 'undefined') return

    const styleStateEl = document.querySelector('.peer\\/style-state')
    styleStateEl?.classList.toggle(name)
  }

  return { toggleClass }
}

/** @description Выставляет классы div элементу.
 * Далее различные элементы могут использовать эти классы для стилизации.
 * Суть компонента в том, чтобы хранить состояния в CSS классах без useState */
function StyleStates() {
  const pathname = usePathname()
  const { scrollPos } = useScroll()
  const ref = useRef<HTMLDivElement>(null)

  // Scroll className
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (scrollPos >= 20) {
      ref.current?.classList.add('is-scrolled')
    } else {
      ref.current?.classList.remove('is-scrolled')
    }
  }, [scrollPos])

  const className = [
    // prettier-ignore
    pathname === '/' ? 'is-white' : 'is-black',
  ].join(' ')

  return <div className={`peer/style-state absolute hidden ${className}`} ref={ref} />
}

export default StyleStates
