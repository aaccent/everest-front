'use client'

import React, { PropsWithChildren, useLayoutEffect, useRef, useState } from 'react'

function ObjectsMapContainer({ children }: PropsWithChildren) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState<string>('100svh')

  // Нужен чтобы карта полностью вмещалась по высоте в экран пользователя
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const headerTop = document.querySelector<HTMLElement>('*:has(+header)')
    const header = document.querySelector<HTMLElement>('header')

    if (!headerTop || !header || !containerRef.current) return

    const fullHeaderHeight = headerTop.offsetHeight + header.offsetHeight
    const containerStyles = window.getComputedStyle(containerRef.current)
    const deltaHeight = fullHeaderHeight + parseInt(containerStyles.marginTop) * 2
    setHeight(`calc(100svh - ${deltaHeight}px)`)
  }, [])

  return (
    <div
      className='mx-container relative my-[16px] overflow-hidden rounded-[20px] bg-[#ECE7E4] md:my-[32px] md:rounded-[32px]'
      style={{ height }}
      ref={containerRef}
    >
      {children}
    </div>
  )
}

export default ObjectsMapContainer
