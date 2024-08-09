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
  const gkDetailed = await getComplexDetailed(params.complex)
  return (
    <>
      <Breadcrumbs list={gkDetailed.breadcrumbs} />
      <ComplexHero {...gkDetailed.complex} />
      <PageMenuWrapper>
        <PageSlider {...gkDetailed} />
        <DetailedInfo {...gkDetailed.complex} />
      </PageMenuWrapper>
      <LayoutChoice houses={gkDetailed.objects} />
    </>
  )
}

export default Page
