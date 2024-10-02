import React from 'react'

import MainHero from './_components/MainHero'
import Services from './_components/Services/Services'
import SliderSection from '@/components/Slider/SliderSection'
import UsefulLinks from './_components/UsefulLinks/UsefulLinks'

import { getNewBuildingsOnMain, getNewObjects } from '@/globals/api'
import { ROUTES } from '@/globals/paths'

export default async function Home() {
  const newBuildingsOnMain = await getNewBuildingsOnMain()
  const newObjects = await getNewObjects()

  return (
    <>
      <MainHero />
      <SliderSection type='complex' link={ROUTES.COMPLEXES} list={newBuildingsOnMain} title='Новостройки' />
      <Services />
      <SliderSection type='objects' link={ROUTES.SECONDARY_HOUSING} list={newObjects} title='Новинки в каталоге' />
      <UsefulLinks />
    </>
  )
}
