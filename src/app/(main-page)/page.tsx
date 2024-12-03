import React from 'react'

import MainHero from './_components/MainHero'
import SliderSection from '@/components/Slider/SliderSection'

import { getNewBuildingsOnMain, getNewObjects } from '@/globals/api'
import { ROUTES } from '@/globals/paths'

export default async function Home() {
  const newBuildingsOnMain = await getNewBuildingsOnMain().catch(() => [])
  const newObjects = await getNewObjects().catch(() => [])

  return (
    <>
      <MainHero />
      <SliderSection type='complex' link={ROUTES.COMPLEXES} list={newBuildingsOnMain} title='Новостройки' />
      <SliderSection type='objects' link={ROUTES.SECONDARY_HOUSING} list={newObjects} title='Новинки в каталоге' />
    </>
  )
}
