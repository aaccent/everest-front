'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Layer, MapRef, Marker, Source } from 'react-map-gl'
import { FeatureCollection, Point } from 'geojson'
import { Map } from 'mapbox-gl'

import Img from '@/ui/Img'
import Button from '@/ui/buttons/Button'
import { FilterItems } from '@/components/FilterItems'
import CustomMap, { MapViewState, Props as CustomMapProps } from '@/components/CustomMap'
import DetailFilterButton from '@/components/QuickFilter/DetailFilterButton'

import { Filter, useCategoryFilter } from '@/features/catalog/useCategoryFilter'

import { QuickFilters } from '@/types/FiltersType'
import { MapCenter } from '@/types/Map'

import ActiveMarkerSVG from '@/assets/static/map/active-marker.svg'

interface ActivePoint {
  longitude: number
  latitude: number
}

const IMAGE_IDS = {
  MARKER_BG: 'marker-bg',
  MARKER_PRICE_BG: 'marker-price-bg',
  MARKER_PRICE_TEMP_BG: 'marker-price-test-bg',
}

const SOURCE_ID = 'objects'

const LAYER_IDS = {
  UNCLUSTERED: 'unclustered-point',
  UNCLUSTERED_PRICE: 'unclustered-price',
  CLUSTER_COUNT: 'cluster-count',
  CLUSTER_CIRCLE: 'cluster-circle',
  CLUSTER_PRICE: 'cluster-price',
}

type AddImageProperties = Parameters<Map['addImage']>[2]

interface LoadImageProps {
  map: MapRef
  imgId: string
  path: string
  imgOptions?: AddImageProperties
}

function loadImage({ map, imgId, path, imgOptions }: LoadImageProps) {
  if (map.hasImage(imgId)) return

  map.loadImage(path, function (error, image) {
    if (error || !image) throw error

    map.addImage(imgId, image, imgOptions)
  })
}

type MapObject = {
  latitude: number
  longitude: number
  price: number
}

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

export type GetItemsForMapFn = (filter: Filter[], center: MapCenter, zoom: number) => Promise<MapObject[]>

interface Props {
  filters: QuickFilters
  categoryName: string
  getItems: GetItemsForMapFn
}

function ObjectsMap({ filters, categoryName, getItems }: Props) {
  const { filter } = useCategoryFilter()
  const mapRef = useRef<MapRef | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState<string>('100svh')
  const [objects, setObjects] = useState<MapObject[]>([])
  const [viewState, setViewState] = useState<MapViewState>({
    latitude: 53.720593,
    longitude: 91.442593,
    zoom: 12,
  })
  const timeoutId = useRef<NodeJS.Timeout | null>(null)
  const [activePoint, setActivePoint] = useState<ActivePoint | null>(null)

  const mapRefCallback = useCallback((ref: MapRef | null) => {
    if (!ref) return
    mapRef.current = ref
    const map = ref

    loadImage({
      map,
      imgId: IMAGE_IDS.MARKER_BG,
      path: '/map/marker-bg.png',
      imgOptions: {
        content: [40, 6, 62, 30],
        stretchX: [[40, 48]],
        stretchY: [[17, 19]],
      },
    })

    loadImage({
      map,
      imgId: IMAGE_IDS.MARKER_PRICE_BG,
      path: '/map/marker-price-bg.png',
      imgOptions: {
        content: [8, 4, 27, 22],
        stretchX: [[16, 19]],
        stretchY: [[12, 14]],
      },
    })

    loadImage({
      map,
      imgId: IMAGE_IDS.MARKER_PRICE_TEMP_BG,
      path: '/map/marker-price-temp-bg.png',
      imgOptions: {
        content: [8, 4, 27, 22],
        stretchX: [[16, 19]],
        stretchY: [[12, 14]],
      },
    })
  }, [])

  // Нужен чтобы карта полностью вмещалась по высоте в экран пользователя
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const headerTop = document.querySelector<HTMLElement>('*:has(+header)')
    const header = document.querySelector<HTMLElement>('header')

    if (!headerTop || !header || !containerRef.current) return

    const fullHeaderHeight = headerTop.offsetHeight + header.offsetHeight
    const containerStyles = window.getComputedStyle(containerRef.current)
    const deltaHeight = fullHeaderHeight + parseInt(containerStyles.marginTop) * 2
    setHeight(`calc(100svh - ${deltaHeight}px)`)
  }, [])

  useEffect(() => {
    const center = { latitude: viewState.latitude, longitude: viewState.longitude }
    if (timeoutId.current) clearTimeout(timeoutId.current)
    timeoutId.current = setTimeout(() => getItems(filter.parsed, center, viewState.zoom).then(setObjects), 700)
  }, [filter.parsed, viewState])

  const onPointClickHandler: CustomMapProps['onPointClick'] = function (event, feature) {
    const point = feature.geometry as Point

    setActivePoint({
      latitude: feature.properties.latitude,
      longitude: feature.properties.longitude,
    })
  }

  function getActivePointFilter(): any[] {
    if (!activePoint) return []

    return [
      ['!=', ['get', 'longitude'], activePoint.longitude],
      ['!=', ['get', 'latitude'], activePoint.latitude],
    ]
  }

  return (
    <div
      className='mx-container relative my-[16px] md:my-[32px] md:rounded-[32px]'
      style={{ height }}
      ref={containerRef}
    >
      <div className='pointer-events-none absolute inset-[16px] z-10 md:inset-[20px]'>
        <div className='pointer-events-auto absolute bottom-0 flex w-full gap-[8px] md:hidden'>
          <Button
            className='h-[50px] justify-center px-[10px] text-center after:size-[18px] after:!bg-default'
            icon={{ img: 'LIST_VIEW' }}
            variation='third'
          >
            Списком 24 объкт.
          </Button>
          <Button className='h-[50px] justify-center !px-0 text-center' icon={{ img: 'FILTER' }} variation='primary'>
            фильтр
          </Button>
        </div>
        <div className='pointer-events-auto absolute bottom-0 flex w-full items-center gap-[16px] rounded-[32px] bg-base-100 p-[24px]'>
          <DetailFilterButton category={categoryName} />
          <FilterItems filters={filters.filters} isQuick />
          <button
            className='text-base-500-reg-100-upper ml-auto flex items-center gap-[4px] text-base-600/50 after:size-[13px] after:bg-icon-close after:opacity-50 after:bg-default'
            type='button'
          >
            Сбросить всё
          </button>
        </div>
      </div>
      <CustomMap
        viewState={viewState}
        setViewState={setViewState}
        className='size-full rounded-[20px]'
        cooperativeGestures={false}
        ref={mapRefCallback}
        interactiveLayerIds={[LAYER_IDS.UNCLUSTERED, LAYER_IDS.CLUSTER_PRICE, LAYER_IDS.UNCLUSTERED_PRICE]}
        sourceId={SOURCE_ID}
        onPointClick={onPointClickHandler}
      >
        {activePoint && (
          <Marker {...activePoint} anchor='bottom'>
            <div className='relative h-[53px] w-[48px]'>
              <Img src={ActiveMarkerSVG} isSVG />
            </div>
          </Marker>
        )}
        <Source
          id={SOURCE_ID}
          type='geojson'
          data={convertMapObjectsToGeojson(objects)}
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
            filter={['all', ['!', ['has', 'point_count']], ...getActivePointFilter()]}
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
            filter={['all', ['!', ['has', 'point_count']], ...getActivePointFilter()]}
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
      </CustomMap>
    </div>
  )
}

export default ObjectsMap
