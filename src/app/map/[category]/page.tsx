import React from 'react'
import { notFound } from 'next/navigation'
import ObjectsMap, { GetItemsForMapFn } from '@/app/map/_components/ObjectsMap'
import { getCategory, getFilters, getQuickFilters } from '@/globals/api'
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
  return await getCategory(categoryCode, {
    subcategory,
    filter: filters,
    location: {
      center,
      radius: convertZoomInRadius(Math.trunc(zoom)),
    },
  })
}

async function Page(props: CategoryPage) {
  const params = await props.params
  const quickFilter = await getQuickFilters(params.category).catch(notFound)
  const detailedFiltersInputs = await getFilters(params.category).catch(notFound)

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
      detailedFiltersInputs={detailedFiltersInputs.filters}
    />
  )
}

export default Page
