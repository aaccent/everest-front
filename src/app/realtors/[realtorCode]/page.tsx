import React from 'react'
import { RealtorPage } from '@/types/Page'
import { getRealtorDetailed } from '@/globals/api/methods/realtors/getRealtorDetailed'
import MainHero from '@/app/realtors/[realtorCode]/_components/MainHero'
import Breadcrumbs from '@/components/Breadcrumbs'
import { BreadcrumbItem } from '@/types/Breadcrumbs'
import About from '@/app/realtors/[realtorCode]/_components/About'
import { getCategory, getQuickFilters } from '@/globals/api'
import { GetObjectsFn } from '@/features/useFilterAndPagination'
import { DefaultObject } from '@/types/catalog/DefaultObject'

const TEST_REALTOR_CATEGORY = 'secondary-housing'

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

  const quickFilters = await getQuickFilters(TEST_REALTOR_CATEGORY)
  const initObjectsList = await getCategory(TEST_REALTOR_CATEGORY)
  const getObjects: GetObjectsFn<DefaultObject> = async (props) => {
    'use server'
    const data = await getCategory(TEST_REALTOR_CATEGORY, { ...props })
    return {
      objects: data.objects,
      total: data.total,
      count: data.count,
    }
  }

  return (
    <>
      <Breadcrumbs list={breadcrumbs} />
      <MainHero {...realtor} />
      <About propsForOffersState={{ initObjectsList, getObjects, quickFilters }} />
    </>
  )
}

export default Page
