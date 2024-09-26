import React from 'react'
import ObjectsMap, { GetItemsForMapFn } from '@/app/map/_components/ObjectsMap'
import { getQuickFilters } from '@/globals/api/methods/getFilters'
import { getSecondaryHousing } from '@/globals/api'
import { convertZoomInRadius } from '@/features/utility/map-zoom'

const getItems: GetItemsForMapFn = async function (filters, center, zoom) {
  'use server'
  const category = await getSecondaryHousing({
    filter: filters,
    location: {
      center,
      radius: convertZoomInRadius(Math.trunc(zoom)),
    },
  })

  return category.objects.map((item) => ({
    id: item.id,
    img: item.gallery?.[0] || null,
    price: item.price,
    longitude: item.longitude,
    latitude: item.latitude,
    address: item.address,
    properties: [],
  }))
}

async function Page() {
  const categoryName = 'secondary-housing'
  const quickFilter = await getQuickFilters(categoryName)

  return <ObjectsMap categoryName={categoryName} filters={quickFilter} getItems={getItems} />
}

export default Page
