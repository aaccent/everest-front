import React from 'react'
import { flatPlural } from '@/features/utility/pluralRules'
import { ObjectsMapDetailListItem } from '@/app/map/_components/ObjectsMapAsideDetail'
import { DefaultObject } from '@/types/catalog/DefaultObject'

import { PopupTemplate } from '@/layout/popups/PopupTemplate'

interface Props {
  house: string | null
  flatsCount: number
  onCloseButtonClick: () => void
  list: DefaultObject[]
}

function MapObjectsPopup({ house, flatsCount, onCloseButtonClick, list }: Props) {
  function showList() {
    return list.map((item) => <ObjectsMapDetailListItem key={item.id} {...item} />)
  }

  return (
    <PopupTemplate>
      <div className='mt-[64px] h-full rounded-t-[24px] bg-base-100 p-[24px]'>
        <div className='mb-[20px] flex gap-[12px] border-b border-b-base-600/10 pb-[20px]'>
          <div className='flex items-center gap-[12px]'>
            <div className='flex size-[48px] items-center justify-center rounded-full bg-primary after:size-[20px] after:bg-icon-house after:filter-base-100 after:bg-default' />
            <div className='flex flex-col gap-[4px]'>
              {house && <div className='text-base-300-lg-100'>{house}</div>}
              <div className='text-base-400-lg-100 text-base-600/50'>
                {flatsCount} {flatPlural.get(flatsCount)}
              </div>
            </div>
          </div>
          <button
            className='ml-auto flex size-[36px] items-center justify-center rounded-full bg-base-300 after:size-[14px] after:bg-icon-close after:filter-base-600 after:bg-default'
            onClick={onCloseButtonClick}
          />
        </div>
        <ul className='flex flex-col gap-[24px]'>{showList()}</ul>
      </div>
    </PopupTemplate>
  )
}

export default MapObjectsPopup
