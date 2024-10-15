import { useEffect, useRef, useState } from 'react'
import { MapViewState } from '@/components/CustomMap'
import { Filter, useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import { MapCenter } from '@/types/Map'
import { FeatureCollection } from 'geojson'
import { ABAKAN_VIEW_STATE } from '@/globals/map'

export interface MapObject {
  id: number
  price: number
  longitude: number
  latitude: number
  address: string | null
  properties?: string[]
  img: string | null
}

/** Превращает `list` в формат geojson */
function convertMapObjectsToGeojson(list: MapObject[]): FeatureCollection | null {
  if (!list) return null
  return {
    type: 'FeatureCollection',
    features: list.map((object) => {
      return {
        id: object.id,
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [object.longitude, object.latitude],
        },
        properties: object,
      }
    }),
  }
}

export type GetItemsForMapFn = (filter: Filter[], center: MapCenter, zoom: number) => Promise<MapObject[]>

interface Props {
  getItems: GetItemsForMapFn
}

/**
 * Хук нужен только для {@link ObjectsMap} и существует для упрощения чтения.
 * Отделяет логику получения списка элементов и его обновления после фильтрации
 * @param getItems - функция для получения объектов которая принимает
 * выставленные фильтры, координаты центра карты и уровень приближения.
 */
export function useObjectsMapData({ getItems }: Props) {
  const [viewState, setViewState] = useState<MapViewState>(ABAKAN_VIEW_STATE)
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

  return { objects: convertMapObjectsToGeojson(objects), viewStateControl: { viewState, setViewState } }
}
