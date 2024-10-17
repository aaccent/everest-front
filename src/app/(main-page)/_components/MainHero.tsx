import React from 'react'
import Image from 'next/image'
import Section from '@/layout/Section'

import HeroImage from '@/assets/static/main-page/hero.jpg'
import HeroMobileImage from '@/assets/static/main-page/hero-mobile.jpg'
import Container from '@/layout/Container'
import FilterOnMain from '@/app/(main-page)/_components/FilterOnMain/FilterOnMain'
import { getCatalogMenu } from '@/globals/api'

async function MainHero() {
  const categories = await getCatalogMenu()
  return (
    <Section className='relative max-h-[810px] min-h-svh' hideContainer>
      <Image
        className='absolute inset-0 -z-10 hidden h-full w-full object-cover object-center md:block'
        src={HeroImage}
        alt=''
      />
      <Image
        className='absolute inset-0 -z-10 block h-full w-full object-cover object-center md:hidden'
        src={HeroMobileImage}
        alt=''
      />
      <Container className='pt-[90px] md:pt-[140px]'>
        <h1 className='text-header-100 max-w-[850px] uppercase text-base-100'>Первый шаг к вашему новому дому</h1>
      </Container>
      <FilterOnMain categories={categories} />
    </Section>
  )
}

export default MainHero
