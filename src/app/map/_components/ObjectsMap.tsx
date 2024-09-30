'use client'

import React, { useContext, useRef, useState } from 'react'
import { MapRef } from 'react-map-gl'

import Button from '@/ui/buttons/Button'
import { FilterItems } from '@/components/FilterItems'
import DetailFilterButton from '@/components/QuickFilter/DetailFilterButton'
import CustomMap, { MapViewState, Props as CustomMapProps } from '@/components/CustomMap'

import { useObjectsMapImages } from './useObjectsMapImages'
import ObjectsMapContainer from './ObjectsMapContainer'
import ObjectsMapSource, { LAYER_IDS } from './ObjectsMapSource'
import { GetItemsForMapFn, MapObject, useObjectsMapData } from './useObjectsMapData'
import ObjectsMapActivePoint from './ObjectsMapActivePoint'

import { QuickFilters } from '@/types/FiltersType'
import MapObjectDetail from '@/app/map/_components/MapObjectDetail'
import { ABAKAN_VIEW_STATE } from '@/globals/map'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/globals/paths'
import { PopupContext } from '@/features/visible/Popup'

function useCategoryLink() {
  const pathname = usePathname()
  const { filter } = useCategoryFilter()

  const category = pathname.match(/\/map\/(.*)[/?]?/)
  if (!category) return ''

  return ROUTES.CATALOG + `/${category[1]}` + `?filter=${filter.str}`
}

const SOURCE_ID = 'objects'

interface Props {
  filters: QuickFilters
  categoryCode: string
  getItems: GetItemsForMapFn
}

function ObjectsMap({ filters, categoryCode, getItems }: Props) {
  const mapRef = useRef<MapRef | null>(null)
  const [viewState, setViewState] = useState<MapViewState>(ABAKAN_VIEW_STATE)
  const { objects } = useObjectsMapData({ viewState, getItems })
  const { mapRefCallback } = useObjectsMapImages({ setMapRef: (ref) => (mapRef.current = ref) })
  const [activePoints, setActivePoints] = useState<MapObject[] | null>(null)
  const categoryLink = useCategoryLink()
  const { openPopup, closePopup } = useContext(PopupContext)

  function setItems(items: MapObject[]) {
    openPopup({
      name: 'mapObject',
      args: {
        house: items[0].address,
        onCloseButtonClick: () => {
          setActivePoints(null)
          closePopup()
        },
        flatsCount: items.length,
        list: items,
      },
    })

    setActivePoints(items)
  }

  const onPointClickHandler: CustomMapProps['onPointClick'] = function (_, feature) {
    setItems([feature.properties as MapObject])
  }

  const onClusterClickHandler: CustomMapProps['onClusterClick'] = function (_, features) {
    setItems(features.map((item) => item.properties as MapObject))
  }

  return (
    <ObjectsMapContainer>
      <div className='pointer-events-none absolute inset-[16px] z-10 flex flex-col gap-[40px] md:inset-[20px]'>
        <div className='flex h-[1px] grow'>
          {activePoints && (
            <MapObjectDetail
              house={activePoints[0].address}
              onCloseButtonClick={() => setActivePoints(null)}
              flatsCount={activePoints.length}
              list={activePoints}
            />
          )}
          <Button
            href={categoryLink}
            className='pointer-events-auto ml-auto hidden h-[50px] w-fit justify-center px-[10px] text-center after:size-[18px] after:!bg-default md:flex'
            icon={{ img: 'LIST_VIEW' }}
            variation='third'
          >
            Списком 24 объекта
          </Button>
        </div>
        <div className='pointer-events-auto mt-auto flex w-full gap-[8px] md:hidden'>
          <Button
            href={categoryLink}
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
        <div className='pointer-events-auto mt-auto hidden w-full items-center gap-[16px] rounded-[32px] bg-base-100 p-[24px] md:flex'>
          <DetailFilterButton category={categoryCode} />
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
        onClusterClick={onClusterClickHandler}
      >
        {activePoints && <ObjectsMapActivePoint {...activePoints[0]} />}
        <ObjectsMapSource
          data={objects}
          sourceId={SOURCE_ID}
          unclusteredFilter={[
            ['!=', ['get', 'longitude'], activePoints?.[0].longitude || 0],
            ['!=', ['get', 'latitude'], activePoints?.[0].latitude || 0],
          ]}
        />
      </CustomMap>
    </ObjectsMapContainer>
  )
}

export default ObjectsMap
export type { GetItemsForMapFn }
