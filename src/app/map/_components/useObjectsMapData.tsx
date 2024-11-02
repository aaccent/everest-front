import { useEffect, useRef, useState } from 'react'
import { MapViewState } from '@/components/CustomMap'
import { Filter, useFilter } from '@/features/useFilter'
import { MapCenter } from '@/types/Map'
import { FeatureCollection } from 'geojson'
import { ABAKAN_VIEW_STATE } from '@/globals/map'
import { DefaultObject } from '@/types/catalog/DefaultObject'

/** Превращает `list` в формат geojson */
function convertDefaultObjectsToGeojson(list: DefaultObject[]): FeatureCollection | null {
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

export type GetItemsForMapFn = (filter: Filter[], center: MapCenter, zoom: number) => Promise<DefaultObject[]>

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
  const { filter } = useFilter()
  const [objects, setObjects] = useState<DefaultObject[]>([])
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

  return { objects: convertDefaultObjectsToGeojson(objects), viewStateControl: { viewState, setViewState } }
}
