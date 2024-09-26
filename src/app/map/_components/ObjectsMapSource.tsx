import React from 'react'
import { Layer, Source } from 'react-map-gl'
import { FeatureCollection } from 'geojson'
import { IMAGE_IDS } from '@/app/map/_components/useObjectsMapImages'

export const LAYER_IDS = {
  UNCLUSTERED: 'unclustered-point',
  UNCLUSTERED_PRICE: 'unclustered-price',
  CLUSTER_COUNT: 'cluster-count',
  CLUSTER_CIRCLE: 'cluster-circle',
  CLUSTER_PRICE: 'cluster-price',
}

interface Props {
  unclusteredFilter: any[]
  sourceId: string
  data: FeatureCollection
}

function ObjectsMapSource({ unclusteredFilter, sourceId, data }: Props) {
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
      }}
    >
      <Layer
        id={LAYER_IDS.UNCLUSTERED_PRICE}
        type='symbol'
        filter={['all', ['!', ['has', 'point_count']], ...unclusteredFilter]}
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
        filter={['all', ['!', ['has', 'point_count']], ...unclusteredFilter]}
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
        filter={['has', 'point_count']}
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
        filter={['has', 'point_count']}
        paint={{
          'circle-radius': 12,
          'circle-color': '#ffffff',
          'circle-translate': [-30, 0],
        }}
      />
      <Layer
        id={LAYER_IDS.CLUSTER_COUNT}
        type='symbol'
        filter={['has', 'point_count']}
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
