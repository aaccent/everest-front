'use client'

import { useEffect, useState } from 'react'

function getWindowScroll() {
  if (typeof window === 'undefined') return

  return window.scrollY
}

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
