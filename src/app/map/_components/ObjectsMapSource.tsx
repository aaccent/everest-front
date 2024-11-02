import React from 'react'
import { Layer, Source } from 'react-map-gl'
import { FeatureCollection } from 'geojson'
import { IMAGE_IDS } from '@/app/map/_components/useObjectsMapImages'
import { DefaultObject } from '@/types/catalog/DefaultObject'

export const LAYER_IDS = {
  UNCLUSTERED: 'unclustered-point',
  UNCLUSTERED_PRICE: 'unclustered-price',
  CLUSTER_COUNT: 'cluster-count',
  CLUSTER_CIRCLE: 'cluster-circle',
  CLUSTER_PRICE: 'cluster-price',
}

interface Props {
  activePoint: DefaultObject | null
  sourceId: string
  data: FeatureCollection | null
}

/**
 * Компонент нужен только для {@link ObjectsMap} и существует для упрощения чтения.
 * Отделяет компонент источника данных и слои карты
 * @param activePoint - текущая активная точка.
 * Если выбран кластер, то передавать нужно любой элемент из него.
 * @param sourceId - идентификатор источника
 * @param data - список точек в формате geojson
 */
function ObjectsMapSource({ activePoint, sourceId, data }: Props) {
  const filter: any[] = [
    ['!=', ['get', 'longitude'], activePoint?.longitude || 0],
    ['!=', ['get', 'latitude'], activePoint?.latitude || 0],
  ]

  return (
    <Source
      id={sourceId}
      type='geojson'
      data={data}
      cluster
      clusterMaxZoom={22}
      clusterRadius={0.2}
      clusterProperties={{
        min: ['min', ['get', 'price']],
        latitude: ['min', ['get', 'latitude']],
        longitude: ['min', ['get', 'longitude']],
      }}
    >
      <Layer
        id={LAYER_IDS.UNCLUSTERED_PRICE}
        type='symbol'
        filter={['all', ['!', ['has', 'point_count']], ...filter]}
        minzoom={13}
        layout={{
          'icon-image': IMAGE_IDS.MARKER_PRICE_TEMP_BG,
          'icon-text-fit': 'both',
          'text-field': ['concat', ['to-string', ['/', ['get', 'price'], 1_000_000]], ' млн'],
          'text-size': 14,
          'icon-anchor': 'bottom',
        }}
        paint={{
          'text-color': '#fff',
        }}
      />
      <Layer
        id={LAYER_IDS.UNCLUSTERED}
        type='circle'
        filter={['all', ['!', ['has', 'point_count']], ...filter]}
        maxzoom={13}
        paint={{
          'circle-radius': 4,
          'circle-color': '#ffffff',
          'circle-stroke-color': '#3E756F',
          'circle-stroke-width': 6,
        }}
      />
      <Layer
        id={LAYER_IDS.CLUSTER_PRICE}
        type='symbol'
        filter={['all', ['has', 'point_count'], ...filter]}
        layout={{
          'icon-image': IMAGE_IDS.MARKER_BG,
          'icon-text-fit': 'both',
          'text-field': ['concat', 'от ', ['to-string', ['/', ['get', 'min'], 1_000_000]], ' млн'],
          'text-size': 14,
          'icon-anchor': 'left',
          'text-anchor': 'left',
          'text-offset': [-0.7, 0],
        }}
        paint={{
          'text-color': '#fff',
        }}
      />
      <Layer
        id={LAYER_IDS.CLUSTER_CIRCLE}
        type='circle'
        filter={['all', ['has', 'point_count'], ...filter]}
        paint={{
          'circle-radius': 12,
          'circle-color': '#ffffff',
          'circle-translate': [-30, 0],
        }}
      />
      <Layer
        id={LAYER_IDS.CLUSTER_COUNT}
        type='symbol'
        filter={['all', ['has', 'point_count'], ...filter]}
        layout={{
          'text-field': ['get', 'point_count'],
          'text-size': ['case', ['>=', ['get', 'point_count'], 100], 11, 14],
          'text-anchor': 'center',
          'text-offset': ['case', ['>=', ['get', 'point_count'], 100], [-2.75, 0], [-2.2, 0]],
          'text-ignore-placement': true,
        }}
        paint={{
          'text-color': '#3E756F',
        }}
      />
    </Source>
  )
}

export default ObjectsMapSource
