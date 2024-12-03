import React from 'react'
import { getItems } from '@/app/map/[category]/page'
import { CategoryPage, SubcategoryPage } from '@/types/Page'
import { getFilters, getQuickFilters } from '@/globals/api'
import ObjectsMap, { GetItemsForMapFn } from '@/app/map/_components/ObjectsMap'

async function Page(props: SubcategoryPage & CategoryPage) {
  const params = await props.params
  const quickFilter = await getQuickFilters(params.category)
  const detailedFilters = await getFilters(params.category)

  const _getItems: GetItemsForMapFn = async function (filters, center, zoom) {
    'use server'

    return getItems({
      ...params,
      filters,
      center,
      zoom,
    })
  }

  return (
    <ObjectsMap
      categoryCode={params.category}
      quickFilters={quickFilter}
      getItems={_getItems}
      detailedFiltersInputs={detailedFilters.filters}
    />
  )
}

export default Page
