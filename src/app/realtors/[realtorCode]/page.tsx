import React from 'react'
import { RealtorPage } from '@/types/Page'
import { getRealtorDetailed } from '@/globals/api/methods/realtors/getRealtorDetailed'
import MainHero from '@/app/realtors/[realtorCode]/_components/MainHero'
import Breadcrumbs from '@/components/Breadcrumbs'
import { BreadcrumbItem } from '@/types/Breadcrumbs'
import About from '@/app/realtors/[realtorCode]/_components/About'
import { getCategory, getQuickFilters } from '@/globals/api'

async function Page({ params }: RealtorPage) {
  const realtor = await getRealtorDetailed(params.realtorCode)
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

  const testQuickFilters = await getQuickFilters('new-building') //Возможно будет другой метод получения быстрых фильтров в зависимости от params.realtorCode
  const testInitList = await getCategory('secondary-housing')

  //const testGetObjects : GetObjectsFn<DefaultObject> = async ()

  return (
    <>
      <Breadcrumbs list={breadcrumbs} />
      <MainHero {...realtor} />
      <About quickFilters={testQuickFilters} />
    </>
  )
}

export default Page
