import React from 'react'
import ObjectsMap, { GetItemsForMapFn } from '@/app/map/_components/ObjectsMap'
import { getCategory, getGeneralFilters, getQuickFilters } from '@/globals/api'
import { convertZoomInRadius } from '@/features/utility/map-zoom'
import { CategoryPage } from '@/types/Page'
import { GetFiltersFn } from '@/layout/catalog/CategoryLayout'

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
  const categoryCode = params.category

  const _getItems: GetItemsForMapFn = async function (filters, center, zoom) {
    'use server'

    return getItems({
      ...params,
      filters,
      center,
      zoom,
    })
  }

  const _getFilters: GetFiltersFn = async () => {
    'use server'
    const general = await getGeneralFilters(categoryCode)
    const quick = await getQuickFilters(categoryCode)
    return {
      quick,
      general,
      categoryCode,
    }
  }

  return <ObjectsMap getFilters={_getFilters} getItems={_getItems} />
}

export default Page
