import React from 'react'
import { ComplexPage } from '@/types/Page'
import { getComplexDetailed } from '@/globals/api'
import Breadcrumbs from '@/components/Breadcrumbs'
import ComplexHero from './_components/ComplexHero'
import PageSlider from './_components/PageSlider'
import DetailedInfo from './_components/DetailedInfo'
import PageMenuWrapper from './_components/PageMenuWrapper'
import LayoutChoice from './_components/LayoutChoice/LayoutChoice'
import Bonuses from '@/app/catalog/complexes/[complex]/_components/Bonuses'

async function Page({ params }: ComplexPage) {
  const complex = await getComplexDetailed(params.complex)

  return (
    <>
      <Breadcrumbs list={complex.breadcrumbs.slice(1)} />
      <ComplexHero complex={complex} />
      <PageMenuWrapper>
        <PageSlider complex={complex} />
        <DetailedInfo complex={complex} />
      </PageMenuWrapper>
      <LayoutChoice complex={complex} />
      <Bonuses />
    </>
  )
}

export default Page
