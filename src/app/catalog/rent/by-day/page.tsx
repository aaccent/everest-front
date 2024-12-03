import React from 'react'
import { GetObjectsFn } from '@/features/useFilterAndPagination'
import { CategoryProvider } from '@/layout/catalog/CategoryContext'
import CategoryLayout from '@/layout/catalog/CategoryLayout'
import CatalogContent from '@/layout/catalog/CatalogContent'
import { getRentByDayCategory } from '@/globals/api/methods/catalog/getRentByDayCategory'
import { DefaultObject } from '@/types/catalog/DefaultObject'
import { Pagination } from '@/types/Pagination'
import { AnyCategory } from '@/types/catalog/Category'
import { getFilters, getQuickFilters } from '@/globals/api'

type NonCategory = {
  objects: DefaultObject[]
  count: number
} & Pagination

function convertObjectsListToCategory(nonCategoryObj: NonCategory): AnyCategory {
  return {
    ...nonCategoryObj,
    id: 0,
    breadcrumbs: [],
    categories: [],
    description: '',
    name: '',
    seoUrl: '',
  }
}

async function Page() {
  // prettier-ignore
  const [
    category,
    quickFilters,
    detailFilters
  ] = await Promise.all([
    getRentByDayCategory({ page: 1, perPage: 9 }),
    getQuickFilters('rent'),
    getFilters('rent'),
  ])

  const _category = {
    ...convertObjectsListToCategory(category),
    name: 'Аренда посуточно',
    breadcrumbs: [{ name: 'Аренда', seo: 'rent' }],
  }

  const getObjects: GetObjectsFn<DefaultObject> = async function ({ filter, sort, page, perPage, location }) {
    'use server'
    return await getRentByDayCategory({ filter, sort, page, perPage, location })
  }

  return (
    <CategoryProvider type='default' initList={category} getObjects={getObjects}>
      <CategoryLayout category={_category} quickFilters={quickFilters} detailFilters={detailFilters}>
        <CatalogContent type='default' category={_category} />
      </CategoryLayout>
    </CategoryProvider>
  )
}

export default Page
