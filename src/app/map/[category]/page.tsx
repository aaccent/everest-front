import React from 'react'
import ObjectsMap, { GetItemsForMapFn } from '@/app/map/_components/ObjectsMap'
import { getQuickFilters } from '@/globals/api/methods/getFilters'
import { getCategory } from '@/globals/api'
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
  const category = await getCategory({
    category: categoryCode,
    subcategory,
    filter: filters,
    location: {
      center,
      radius: convertZoomInRadius(Math.trunc(zoom)),
    },
  })

  return category.objects.map((item) => ({
    id: item.id,
    img: item.gallery?.images?.[0] || null,
    price: item.price,
    longitude: item.longitude,
    latitude: item.latitude,
    address: item.address,
  }))
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

  return <ObjectsMap categoryCode={params.category} filters={quickFilter} getItems={_getItems} />
}

export default Page
