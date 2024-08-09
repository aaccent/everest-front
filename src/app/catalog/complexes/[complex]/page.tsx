import React from 'react'
import { ComplexPage } from '@/types/Page'
import { getComplexDetailed } from '@/globals/api'
import Breadcrumbs from '@/components/Breadcrumbs'
import ComplexHero from '@/page-components/complex/ComplexHero'
import PageSlider from '@/page-components/complex/PageSlider'
import DetailedInfo from '@/page-components/complex/DetailedInfo'
import PageMenuWrapper from '@/page-components/complex/PageMenuWrapper'
import LayoutChoice from '@/page-components/complex/LayoutChoice/LayoutChoice'

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
    </>
  )
}

export default Page
