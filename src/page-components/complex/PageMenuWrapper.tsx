'use client'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import PageMenu from '@/page-components/complex/PageMenu'
import Section from '@/layout/Section'

function PageMenuWrapper({ children }: PropsWithChildren) {
  const [className, setClassName] = useState<string>('')
  const ref = useRef<HTMLDivElement>(null)

  const turnOff = true

  useEffect(() => {
    // Отключено для показа 8 августа
    if (turnOff) return

    const height = ref.current?.offsetHeight
    const bottom = ref.current?.getBoundingClientRect().bottom
    const observer = new IntersectionObserver(
      ([entries]) => {
        if (entries.intersectionRatio > 0) {
          setClassName(
            `fixed top-[62px] z-[100] bg-base-100 w-full pt-[32px] md:top-[0] md:z-50 md:m-[0] md:inset-x-[0]`,
          )
        } else {
          setClassName('')
        }
      },
      { rootMargin: `${bottom}px 0px -${height}px` },
    )
    ref.current && observer.observe(ref.current)
  }, [])

  return (
    <Section>
      <PageMenu className={className} />
      <div className='relative mt-[32px] md:mt-[60px]' ref={ref}>
        {children}
      </div>
    </Section>
  )
}

export default PageMenuWrapper
