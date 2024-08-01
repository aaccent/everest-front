import React from 'react'
import { SubcategoryPage } from '@/types/SubcategoryPage'
import { getComplexDetailed } from '@/globals/api/methods/catalog/getComplexDetailed'
import Breadcrumbs from '@/components/Breadcrumbs'
import MainHero from '@/page-components/gk-detailed/MainHero'

async function Page({ params }: SubcategoryPage) {
  const gkDetailed = await getComplexDetailed(params.subcategory)

  return (
    <>
      <Breadcrumbs list={gkDetailed.breadcrumbs} />
      <MainHero {...gkDetailed.complex!} />
    </>
  )
}

export default Page
