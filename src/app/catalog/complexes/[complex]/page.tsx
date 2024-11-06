import React from 'react'
import { notFound } from 'next/navigation'
import { ComplexPage } from '@/types/Page'
import { getComplexDetailed } from '@/globals/api'
import Breadcrumbs from '@/components/Breadcrumbs'
import ComplexHero from './_components/ComplexHero'
import PageSlider from './_components/PageSlider'
import PageMenuWrapper from './_components/PageMenuWrapper'
import LayoutChoice from './_components/LayoutChoice/LayoutChoice'
import Documentation from './_components/Documentation/Documentation'
import ExclusiveOffers from './_components/ExclusiveOffers'
import Bonuses from '@/app/catalog/complexes/[complex]/_components/Bonuses'
import BuildingProgress from './_components/BuildingProgress/BuildingProgress'

async function Page({ params }: ComplexPage) {
  const complex = await getComplexDetailed(params.complex).catch(notFound)

  return (
    <>
      <Breadcrumbs list={complex.breadcrumbs.slice(1)} />
      <ComplexHero complex={complex} />
      <PageMenuWrapper>
        <PageSlider complex={complex} />
        <ExclusiveOffers />
      </PageMenuWrapper>
      <LayoutChoice complex={complex} />
      <Documentation complexCode={params.complex} />
      <Bonuses />
      <BuildingProgress complexCode={params.complex} />
    </>
  )
}

export default Page
