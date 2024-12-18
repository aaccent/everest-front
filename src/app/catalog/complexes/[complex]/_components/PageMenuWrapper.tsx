'use client'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import PageMenu from '@/app/catalog/complexes/[complex]/_components/PageMenu'

function PageMenuWrapper({ children }: PropsWithChildren) {
  const [className, setClassName] = useState({
    staticMenu: 'visible opacity-100',
    fixedMenu: 'invisible opacity-0',
  })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const headerHeight = document.querySelector('header')?.offsetHeight
    const innerHeight = window.innerHeight
    const top = Number(innerHeight) - Number(headerHeight)

    const observer = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting) {
          setClassName({
            staticMenu: 'invisible opacity-0',
            fixedMenu: 'visible opacity-100',
          })
        } else {
          setClassName({ staticMenu: 'visible opacity-100', fixedMenu: 'invisible opacity-0' })
        }
      },
      { rootMargin: `0px 0px -${top}px 0px` },
    )

    ref.current && observer.observe(ref.current)
  }, [])

  return (
    <div className='relative' ref={ref}>
      <PageMenu
        className={`fixed top-[62px] z-[70] w-full bg-base-100 pl-[56px] pt-[32px] text-base-650 transition-visibility md:inset-x-[0] md:top-[0] md:z-50 md:m-[0] ${className.fixedMenu}`}
      />
      <PageMenu
        className={`px-container first-next:!mt-[32px] md:first-next:mt-[60px] ${className.staticMenu} mb-[60px]`}
      />
      {children}
    </div>
  )
}

export default PageMenuWrapper
