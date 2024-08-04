'use client'
import React, { useEffect, useRef, useState } from 'react'
import Container from '@/layout/Container'

function PageMenu() {
  const [sticky, setSticky] = useState<boolean>()
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entries]) => {
      if (entries.boundingClientRect.top < 0) {
        setSticky(true)
      } else if (entries.boundingClientRect.top >= 0) {
        setSticky(false)
      }
    })
    ref.current && observer.observe(ref.current)
  }, [])
  return (
    <Container>
      <nav className='overflow-auto border-b border-b-base-600/10 pb-[32px] scrollbar-transparent' ref={ref}>
        <ul className='flex items-center gap-[24px]'>
          <li className='whitespace-nowrap'>О проекте</li>
          <li className='whitespace-nowrap'>Инфраструктура</li>
          <li className='whitespace-nowrap'>Наши предложения</li>
          <li className='whitespace-nowrap'>Выбор квартиры</li>
          <li className='whitespace-nowrap'>Подбор ипотеки</li>
        </ul>
      </nav>
    </Container>
  )
}

export default PageMenu
