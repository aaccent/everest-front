'use client'

import React, { useContext, useState } from 'react'

import Button from '@/ui/buttons/Button'
import { FilterItems } from '@/components/FilterItems'
import DetailFilterButton from '@/components/QuickFilter/DetailFilterButton'
import CustomMap, { Props as CustomMapProps } from '@/components/CustomMap'

import { useObjectsMapImages } from './useObjectsMapImages'
import ObjectsMapContainer from './ObjectsMapContainer'
import ObjectsMapSource, { LAYER_IDS } from './ObjectsMapSource'
import { GetItemsForMapFn, MapObject, useObjectsMapData } from './useObjectsMapData'
import ObjectsMapActivePoint from './ObjectsMapActivePoint'

import { QuickFilters } from '@/types/FiltersType'
import ObjectsMapAsideDetail from '@/app/map/_components/ObjectsMapAsideDetail'
import { useCategoryFilter } from '@/features/catalog/useCategoryFilter'
import { usePathname } from 'next/navigation'
import { ROUTES } from '@/globals/paths'
import { PopupContext } from '@/features/Popup'
import { AdaptiveContext } from '@/features/adaptive'

function useCategoryLink() {
  const pathname = usePathname()
  const { filter } = useCategoryFilter()

  const category = pathname.match(/\/map\/(.*)[/?]?/)
  if (!category) return ''

  return ROUTES.CATALOG + `/${category[1]}` + `?filter=${filter.str}`
}

const SOURCE_ID = 'objects'

interface Props {
  quickFilters: QuickFilters
  categoryCode: string
  getItems: GetItemsForMapFn
}

function ObjectsMap({ quickFilters, categoryCode, getItems }: Props) {
  const { isDesktop } = useContext(AdaptiveContext)
  const { openPopup, closePopup } = useContext(PopupContext)

  const categoryLink = useCategoryLink()
  const { mapRefCallback } = useObjectsMapImages()
  const { objects, viewStateControl } = useObjectsMapData({ getItems })
  const [activePoints, setActivePoints] = useState<MapObject[] | null>(null)

  function setItems(items: MapObject[]) {
    setActivePoints(items)

    if (isDesktop) return

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
  }

  const onPointClickHandler: CustomMapProps['onPointClick'] = function (_, feature) {
    setItems([feature.properties as MapObject])
  }

  const onClusterClickHandler: CustomMapProps['onClusterClick'] = function (_, features) {
    setItems(features.map((item) => item.properties as MapObject))
  }

  const onMoreZoomClick = () => {
    const zoom = viewStateControl.viewState.zoom + 0.5
    viewStateControl.setViewState({ ...viewStateControl.viewState, zoom })
  }

  const onLessZoomClick = () => {
    const zoom = viewStateControl.viewState.zoom - 0.5
    viewStateControl.setViewState({ ...viewStateControl.viewState, zoom })
  }

  return (
    <ObjectsMapContainer>
      <div className='pointer-events-none absolute inset-[16px] z-10 flex flex-col gap-[40px] md:inset-[20px]'>
        <div className='flex h-[1px] grow'>
          {activePoints && (
            <ObjectsMapAsideDetail
              houseAddress={activePoints[0].address}
              onCloseButtonClick={() => setActivePoints(null)}
              flatsCount={activePoints.length}
              list={activePoints}
            />
          )}
          <div className='ml-auto flex flex-col items-end justify-between'>
            <Button
              href={categoryLink}
              className='pointer-events-auto ml-auto hidden h-[50px] w-fit justify-center px-[10px] text-center after:size-[18px] after:!bg-default md:flex'
              icon={{ img: 'LIST_VIEW' }}
              variation='third'
            >
              Списком 24 объекта
            </Button>
            <div className='pointer-events-auto relative hidden h-[70px] w-[42px] flex-col rounded-[12px] bg-base-100 before:absolute before:inset-y-1/2 before:left-0 before:block before:h-[1px] before:w-[8px] before:-translate-y-1/2 before:bg-base-400 after:absolute after:inset-y-1/2 after:right-0 after:block after:h-[1px] after:w-[8px] after:-translate-y-1/2 after:bg-base-400 md:flex'>
              <button
                className='relative flex size-full items-center justify-center before:absolute before:inset-1/2 before:block before:h-[12px] before:w-[2px] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-base-600 after:block after:h-[2px] after:w-[12px] after:bg-base-600'
                onClick={onMoreZoomClick}
              />
              <button
                className='relative flex size-full items-center justify-center after:block after:h-[2px] after:w-[12px] after:bg-base-600'
                onClick={onLessZoomClick}
              />
            </div>
          </div>
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
          <DetailFilterButton categoryName={categoryCode} quickFilters={quickFilters} />
          <FilterItems filters={quickFilters.filters} isQuick />
          <button
            className='text-base-500-reg-100-upper ml-auto flex items-center gap-[4px] text-base-600/50 after:size-[13px] after:bg-icon-close after:opacity-50 after:bg-default'
            type='button'
          >
            Сбросить всё
          </button>
        </div>
      </div>
      <CustomMap
        {...viewStateControl}
        className='size-full rounded-[20px]'
        cooperativeGestures={false}
        ref={mapRefCallback}
        interactiveLayerIds={[LAYER_IDS.UNCLUSTERED, LAYER_IDS.CLUSTER_PRICE, LAYER_IDS.UNCLUSTERED_PRICE]}
        sourceId={SOURCE_ID}
        onPointClick={onPointClickHandler}
        onClusterClick={onClusterClickHandler}
      >
        {activePoints && <ObjectsMapActivePoint {...activePoints[0]} />}
        <ObjectsMapSource data={objects} sourceId={SOURCE_ID} activePoint={activePoints?.[0] || null} />
      </CustomMap>
    </ObjectsMapContainer>
  )
}

export default ObjectsMap
export type { GetItemsForMapFn }
