import React from 'react'
import { getCategory, getFilters, getQuickFilters } from '@/globals/api'
import CatalogContent from '@/layout/catalog/CatalogContent'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import { GetObjectsFn } from '@/features/useFilterAndPagination'
import { CategoryProvider } from '@/layout/catalog/CategoryContext'
import { DefaultObject } from '@/types/catalog/DefaultObject'
import { ROUTES } from '@/globals/paths'
import { CategoryPage } from '@/types/Page'

async function Page(props: CategoryPage) {
  const params = await props.params

  // prettier-ignore
  const [
    category,
    quickFilters,
    detailFilters
  ] = await Promise.all([
    getCategory(params.category, {
      isNew: true,
      page: 1,
      perPage: 9,
    }),
    getQuickFilters(params.category),
    getFilters(params.category),
  ])

  const _category = {
    ...category,
    name: 'Новинки вторичной недвижимости',
  }

  const getObjects: GetObjectsFn<DefaultObject> = async function (props) {
    'use server'
    return await getCategory(params.category, { isNew: true, ...props })
  }

  return (
    <CategoryProvider type='default' initList={category} getObjects={getObjects}>
      <CategoryLayout
        category={_category}
        quickFilters={quickFilters}
        detailFilters={detailFilters}
        urlBase={ROUTES.NEW_CATALOG}
      >
        <CatalogContent type='default' category={_category} />
      </CategoryLayout>
    </CategoryProvider>
  )
}

export default Page
