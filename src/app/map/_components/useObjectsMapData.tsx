import { useEffect, useRef, useState } from 'react'
import { MapViewState } from '@/components/CustomMap'
import { Filter, useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import { MapCenter } from '@/types/Map'
import { FeatureCollection } from 'geojson'

function convertMapObjectsToGeojson(objects: MapObject[]): FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: objects.map((object) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [object.longitude, object.latitude],
      },
      properties: {
        price: object.price,
        longitude: object.longitude,
        latitude: object.latitude,
      },
    })),
  }
}

type MapObject = {
  latitude: number
  longitude: number
  price: number
}

export type GetItemsForMapFn = (filter: Filter[], center: MapCenter, zoom: number) => Promise<MapObject[]>

interface Props {
  viewState: MapViewState
  getItems: GetItemsForMapFn
}

export function useObjectsMapData({ viewState, getItems }: Props) {
  const { filter } = useCategoryFilter()
  const [objects, setObjects] = useState<MapObject[]>([])
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const center = { latitude: viewState.latitude, longitude: viewState.longitude }

    if (timeoutId.current) clearTimeout(timeoutId.current)

    timeoutId.current = setTimeout(async () => {
      const items = await getItems(filter.parsed, center, viewState.zoom)
      setObjects(items)
    }, 700)

    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current)
    }
  }, [filter.parsed, viewState])

  return { objects: convertMapObjectsToGeojson(objects) }
}
