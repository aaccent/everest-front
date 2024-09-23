import React from 'react'
import Image from 'next/image'
import Section from '@/layout/Section'

import HeroImage from '@/assets/static/main-page/hero.jpg'
import HeroMobileImage from '@/assets/static/main-page/hero-mobile.jpg'
import Container from '@/layout/Container'
import Filters from '@/app/(main-page)/_components/Filter/Filters'

function MainHero() {
  return (
    <Section className='relative max-h-[810px] min-h-svh' hideContainer>
      <Image
        className='absolute inset-0 -z-10 hidden h-full object-cover object-center md:block'
        src={HeroImage}
        alt=''
      />
      <Image
        className='absolute inset-0 -z-10 block h-full object-cover object-center md:hidden'
        src={HeroMobileImage}
        alt=''
      />
      <Container className='pt-[90px] md:pt-[140px]'>
        <h1 className='text-header-100 max-w-[850px] uppercase text-base-100'>Первый шаг к вашему новому дому</h1>
      </Container>
      <Filters />
    </Section>
  )
}

export default MainHero
