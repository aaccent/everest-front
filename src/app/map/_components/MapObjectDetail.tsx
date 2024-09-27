import React from 'react'
import Img from '@/ui/Img'
import { MapObject } from '@/app/map/_components/useObjectsMapData'
import { formatPriceShort } from '@/features/utility/price'
import { flatPlural } from '@/features/utility/pluralRules'

function ObjectsMapDetailDataItem({ img, price, properties }: MapObject) {
  function showProperties() {
    return properties.map((item, i) => (
      <span className='after:size-[5px] after:rounded-full after:bg-base-600/50' key={i}>
        {item}
      </span>
    ))
  }

  return (
    <li className='flex gap-[16px]'>
      <div className='relative h-[100px] w-[140px] rounded-[16px] bg-base-600/10'>
        <Img src={img} fill />
      </div>
      <div className='flex flex-col'>
        <div className='text-header-500 mt-[8px]'>{formatPriceShort(price)}</div>
        {!!properties.length && <div className='mt-[12px] flex items-center gap-[4px]'>{showProperties()}</div>}
        <div className='mt-auto flex gap-[6px]'>
          <button className='flex size-[36px] items-center justify-center rounded-full bg-base-300 after:size-[20px] after:bg-icon-heart after:bg-default' />
          <button className='flex size-[36px] items-center justify-center rounded-full bg-base-300 after:size-[20px] after:bg-icon-scale after:bg-default' />
        </div>
      </div>
    </li>
  )
}

interface Props {
  house: string | null
  flatsCount: number
  onCloseButtonClick: () => void
  list: MapObject[]
}

function MapObjectDetail({ house, flatsCount, onCloseButtonClick, list = [] }: Props) {
  function showList() {
    return list.map((item) => {
      return <ObjectsMapDetailDataItem key={item.id} {...item} />
    })
  }

  return (
    <div className='pointer-events-auto hidden h-full w-full max-w-[380px] flex-col rounded-[32px] bg-base-100 p-[20px] pb-0 md:flex'>
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
  )
}

export default MapObjectDetail
