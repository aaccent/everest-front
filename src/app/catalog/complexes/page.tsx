import React from 'react'
import { getComplexes } from '@/globals/api'
import CatalogContent from '@/layout/catalog/CatalogContent'
import CategoryLayout from '@/layout/catalog/CategoryLayout'

async function Page() {
  const data = await getComplexes()

  const _category = {
    ...data,
    name: 'Жилые Комплексы',
  }

  async function getObjects(filter: string | undefined, sort: string | undefined) {
    'use server'
    const category = await getComplexes(filter, sort)
    return category.objects
  }

  return (
    <CategoryLayout category={_category}>
      <CatalogContent type='complex' category={_category} initList={data.objects} getObjects={getObjects} />
    </CategoryLayout>
  )
}

export default Page
