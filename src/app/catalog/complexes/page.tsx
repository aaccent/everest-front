import React from 'react'
import { getComplexes } from '@/globals/api'
import CatalogContent from '@/layout/catalog/CatalogContent'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { GetObjectsFn } from '@/features/catalog/useCategoryObject'
import { ComplexObject } from '@/types/catalog/Complex'
import { CategoryProvider } from '@/layout/catalog/CategoryContext'

async function Page() {
  const data = await getComplexes()

  const _category = {
    ...data,
    name: 'Жилые Комплексы',
  }

  const getObjects: GetObjectsFn<ComplexObject> = async function ({ filter, sort, page, perPage }) {
    'use server'
    return await getComplexes(filter, sort)
  }

  return (
    <CategoryProvider type='complex' initList={data.objects} getObjects={getObjects}>
      <CategoryLayout category={_category}>
        <CatalogContent type='complex' category={_category} />
      </CategoryLayout>
    </CategoryProvider>
  )
}

export default Page
