import React from 'react'
import { RealtorPage } from '@/types/Page'
import { getRealtorDetailed } from '@/globals/api/methods/realtors/getRealtorDetailed'
import MainHero from '@/app/realtors/[realtorCode]/_components/MainHero'
import Breadcrumbs from '@/components/Breadcrumbs'
import { BreadcrumbItem } from '@/types/Breadcrumbs'

function Page({ params }: RealtorPage) {
  const realtor = getRealtorDetailed(params.realtorCode)
  const breadcrumbs: BreadcrumbItem[] = [
    {
      seo: '/realtors',
      name: 'Риелторы',
    },
    {
      seo: ``,
      name: `${realtor.name}`,
    },
  ]
  return (
    <>
      <Breadcrumbs list={breadcrumbs} />
      <MainHero {...realtor} />
    </>
  )
}

export default Page
