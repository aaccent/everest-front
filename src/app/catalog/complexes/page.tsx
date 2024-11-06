import React from 'react'
import { getComplexes, getComplexesFilters, getComplexesQuickFilters } from '@/globals/api'
import CatalogContent from '@/layout/catalog/CatalogContent'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { GetObjectsFn } from '@/features/useFilterAndPagination'
import { ComplexObject } from '@/types/catalog/Complex'
import { CategoryProvider } from '@/layout/catalog/CategoryContext'

async function Page() {
  // prettier-ignore
  const [
    data, 
    quickFilters, 
    detailFilters
  ] = await Promise.all([
    getComplexes(),
    getComplexesQuickFilters(),
    getComplexesFilters(),
  ])

  const _category = {
    ...data,
    name: 'Жилые Комплексы',
  }

  const getObjects: GetObjectsFn<ComplexObject> = async function ({ filter, sort, page, perPage, location }) {
    'use server'
    return await getComplexes({ filter, sort, page, perPage, location })
  }

  return (
    <CategoryProvider type='complex' initList={data.objects} getObjects={getObjects}>
      <CategoryLayout category={_category} quickFilters={quickFilters} detailFilters={detailFilters}>
        <CatalogContent type='complex' category={_category} />
      </CategoryLayout>
    </CategoryProvider>
  )
}

export default Page
