import React from 'react'
import ObjectsMap, { GetItemsForMapFn } from '@/app/map/_components/ObjectsMap'
import { getCategory, getQuickFilters } from '@/globals/api'
import { convertZoomInRadius } from '@/features/utility/map-zoom'
import { CategoryPage } from '@/types/Page'

interface GetItemsProps {
  category: string
  subcategory?: string
  filters: Parameters<GetItemsForMapFn>[0]
  center: Parameters<GetItemsForMapFn>[1]
  zoom: Parameters<GetItemsForMapFn>[2]
}

export async function getItems({ category: categoryCode, subcategory, zoom, center, filters }: GetItemsProps) {
  'use server'
  const category = await getCategory(categoryCode, {
    subcategory,
    filter: filters,
    location: {
      center,
      radius: convertZoomInRadius(Math.trunc(zoom)),
    },
  })

  return category.objects
}

async function Page({ params }: CategoryPage) {
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
