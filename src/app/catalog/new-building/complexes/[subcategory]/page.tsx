import React from 'react'
import { SubcategoryPage } from '@/types/SubcategoryPage'
import { getComplexDetailed } from '@/globals/api/methods/catalog/getComplexDetailed'
import Breadcrumbs from '@/components/Breadcrumbs'
import MainHero from '@/page-components/gk-detailed/MainHero'
import PageSlider from '@/page-components/gk-detailed/PageSlider'
import DetailedInfo from '@/page-components/gk-detailed/DetailedInfo'
import PageMenuWrapper from '@/page-components/gk-detailed/PageMenuWrapper'
import LayoutChoice from '@/page-components/gk-detailed/LayoutChoice/LayoutChoice'

async function Page({ params }: SubcategoryPage) {
  const gkDetailed = await getComplexDetailed(params.subcategory)
  return (
    <>
      <Breadcrumbs list={gkDetailed.breadcrumbs} />
      <MainHero {...gkDetailed.complex} />
      <PageMenuWrapper>
        <PageSlider {...gkDetailed} />
        <DetailedInfo {...gkDetailed.complex} />
      </PageMenuWrapper>
      <LayoutChoice houses={gkDetailed.objects} />
    </>
  )
}

export default Page
