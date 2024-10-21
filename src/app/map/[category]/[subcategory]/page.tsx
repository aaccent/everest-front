import React from 'react'
import { getItems } from '@/app/map/[category]/page'
import { CategoryPage, SubcategoryPage } from '@/types/Page'
import { getQuickFilters } from '@/globals/api'
import ObjectsMap, { GetItemsForMapFn } from '@/app/map/_components/ObjectsMap'

async function Page({ params }: SubcategoryPage & CategoryPage) {
  const quickFilter = await getQuickFilters(params.category)

  const _getItems: GetItemsForMapFn = async function (filters, center, zoom) {
    'use server'

    return getItems({
      ...params,
      filters,
      center,
      zoom,
    })
  }

  return <ObjectsMap categoryCode={params.category} quickFilters={quickFilter} getItems={_getItems} />
}

export default Page
