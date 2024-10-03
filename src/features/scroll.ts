'use client'

import { useEffect, useState } from 'react'

function getWindowScroll() {
  if (typeof window === 'undefined') return

  return window.scrollY
}

/** @description Возвращает [scrollPos]{@link scrollPos} со значением из window.scrollY.
 * Выставляет обработчик при монтировании и убирает его при демонтировании */
export function useScroll() {
  const [scrollPos, setScrollPos] = useState<number>(getWindowScroll() || 0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    function scrollHandler() {
      setScrollPos(window.scrollY)
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })

    return () => window.removeEventListener('scroll', scrollHandler)
  }, [])

  return { scrollPos }
}

export function hideScroll() {
  if (typeof window === 'undefined') return

  const scrollWidth = window.innerWidth - document.body.offsetWidth
  document.documentElement.style.paddingRight = `${scrollWidth}px`
  document.documentElement.classList.add('hide-scroll')
}

export function showScroll() {
  if (typeof window === 'undefined') return

  document.documentElement.classList.remove('hide-scroll')
  document.documentElement.style.paddingRight = '0'
}

export function toggleScroll() {
  if (typeof window === 'undefined') return

  const isHidingScroll = document.documentElement.classList.contains('hide-scroll')

  if (isHidingScroll) {
    showScroll()
  } else {
    hideScroll()
  }
}
