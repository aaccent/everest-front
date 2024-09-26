'use client'

import React, { useRef, useState } from 'react'
import { MapRef } from 'react-map-gl'

import Button from '@/ui/buttons/Button'
import { FilterItems } from '@/components/FilterItems'
import DetailFilterButton from '@/components/QuickFilter/DetailFilterButton'
import CustomMap, { MapViewState, Props as CustomMapProps } from '@/components/CustomMap'

import { useObjectsMapImages } from './useObjectsMapImages'
import ObjectsMapContainer from './ObjectsMapContainer'
import ObjectsMapSource, { LAYER_IDS } from './ObjectsMapSource'
import { GetItemsForMapFn, useObjectsMapData } from './useObjectsMapData'
import ObjectsMapActivePoint, { Props as ActivePointProps } from './ObjectsMapActivePoint'

import { QuickFilters } from '@/types/FiltersType'

const SOURCE_ID = 'objects'

interface Props {
  filters: QuickFilters
  categoryName: string
  getItems: GetItemsForMapFn
}

function ObjectsMap({ filters, categoryName, getItems }: Props) {
  const mapRef = useRef<MapRef | null>(null)
  const [viewState, setViewState] = useState<MapViewState>({
    latitude: 53.720593,
    longitude: 91.442593,
    zoom: 12,
  })
  const { objects } = useObjectsMapData({ viewState, getItems })
  const { mapRefCallback } = useObjectsMapImages({
    setMapRef: (ref) => {
      mapRef.current = ref
    },
  })
  const [activePoint, setActivePoint] = useState<ActivePointProps | null>(null)

  const onPointClickHandler: CustomMapProps['onPointClick'] = function (_, feature) {
    setActivePoint({
      latitude: feature.properties.latitude,
      longitude: feature.properties.longitude,
    })
  }

  return (
    <ObjectsMapContainer>
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
        {activePoint && <ObjectsMapActivePoint {...activePoint} />}
        <ObjectsMapSource
          data={objects}
          sourceId={SOURCE_ID}
          unclusteredFilter={[
            ['!=', ['get', 'longitude'], activePoint?.longitude || 0],
            ['!=', ['get', 'latitude'], activePoint?.latitude || 0],
          ]}
        />
      </CustomMap>
    </ObjectsMapContainer>
  )
}

export default ObjectsMap
export type { GetItemsForMapFn }
