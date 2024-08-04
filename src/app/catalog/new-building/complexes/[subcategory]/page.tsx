import React from 'react'
import { SubcategoryPage } from '@/types/SubcategoryPage'
import { getComplexDetailed } from '@/globals/api/methods/catalog/getComplexDetailed'
import Breadcrumbs from '@/components/Breadcrumbs'
import MainHero from '@/page-components/gk-detailed/MainHero'
import PageMenu from '@/page-components/gk-detailed/PageMenu'
import PageSlider from '@/page-components/gk-detailed/PageSlider'
import Section from '@/layout/Section'
import DetailedInfo from '@/page-components/gk-detailed/DetailedInfo'

async function Page({ params }: SubcategoryPage) {
  const gkDetailed = await getComplexDetailed(params.subcategory)
  return (
    <>
      <Breadcrumbs list={gkDetailed.breadcrumbs} />
      <MainHero {...gkDetailed.complex!} />
      <PageMenu />
      <Section className='relative mt-[32px] md:mt-[60px]' hideContainer>
        <PageSlider />
        <DetailedInfo {...gkDetailed.complex!} />
      </Section>
    </>
  )
}

export default Page
