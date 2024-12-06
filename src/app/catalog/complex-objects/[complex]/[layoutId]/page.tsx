import React from 'react'
import { ComplexPage, LayoutPage } from '@/types/Page'
import { getLayoutCategory } from '@/globals/api/methods/complex/getLayoutCategory'
import { getFilters, getQuickFilters } from '@/globals/api'
import { GetObjectsFn } from '@/features/useFilterAndPagination'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { CategoryProvider } from '@/layout/catalog/CategoryContext'
import CatalogContent from '@/layout/catalog/CatalogContent'
import { DefaultObject } from '@/types/catalog/DefaultObject'

async function Page(props: ComplexPage & LayoutPage) {
  const params = await props.params

  // prettier-ignore
  const [
    layoutCategory,
    quickFilters,
    detailFilters
  ] = await Promise.all([
    getLayoutCategory(params.complex, parseInt(params.layoutId), {
      perPage: 9,
      page: 1,
    }),
    getQuickFilters('new-building', params.complex),
    getFilters('new-building', params.complex),
  ])

  const getObjects: GetObjectsFn<DefaultObject> = async function ({ filter, sort, page, perPage, location }) {
    'use server'
    return await getLayoutCategory(params.complex, parseInt(params.layoutId), { filter, sort, page, perPage, location })
  }

  return (
    <CategoryProvider type='layout' initList={layoutCategory} getObjects={getObjects}>
      <CategoryLayout category={layoutCategory} quickFilters={quickFilters} detailFilters={detailFilters}>
        <CatalogContent type='layout' category={layoutCategory} complexSeo={params.complex} />
      </CategoryLayout>
    </CategoryProvider>
  )
}

export default Page
