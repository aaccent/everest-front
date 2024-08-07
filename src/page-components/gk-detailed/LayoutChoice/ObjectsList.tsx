'use client'
import React, { useState } from 'react'
import { Characteristics, ComplexDetailedHouse, LayoutObject } from '@/types/Complex'
import Button from '@/ui/buttons/Button'
import ObjectCard from '@/components/Cards/ObjectCard/ObjectCard'

function isHidden(name: string) {
  return name === 'Номер квартиры' || name === 'Тип отделки' ? 'hidden md:table-cell' : ''
}

function shortName(name: string) {
  if (window.matchMedia('(max-width: 768px)').matches && name.length > 6) {
    return `${name.slice(0, 5)}.`
  }
  return name
}

function showHeading(characteristics: Characteristics[]) {
  return characteristics.map((characteristic, index) => (
    <th
      key={index}
      className={`text-base-400-lg-100 pb-[10.5px] capitalize md:pb-[20px] ${isHidden(characteristic.name)}`}
    >
      {shortName(characteristic.name)}
    </th>
  ))
}

function showCharacteristics(characteristics: Characteristics[]) {
  return characteristics.map((characteristic, index) => (
    <td
      key={index}
      className={`text-base-400-lg-100 py-[20px] last:rounded-br-[16px] last:rounded-tr-[16px] group-hover:bg-primary group-hover:text-base-100 group-[:nth-child(odd):hover]:bg-primary group-[:nth-child(odd)]:bg-base-200 md:table-cell md:py-[17px] md:last:rounded-br-[16px] md:last:rounded-tr-[16px] [&:nth-child(2)]:rounded-l-[20px] md:[&:nth-child(2)]:rounded-l-none ${isHidden(characteristic.name)} `}
    >
      {characteristic.value}
    </td>
  ))
}

function ObjectsList({ objects }: ComplexDetailedHouse) {
  const [object, setObject] = useState<LayoutObject | null>(null)

  // TODO: Решить проблему с формированием ссылок, сделать более дружелюбнее
  // @ts-expect-error Временно
  const objectEl = object ? <ObjectCard item={object} /> : null

  return (
    <div className='mb-[32px] justify-between md:mb-[64px] md:flex'>
      <div className='text-base-400-reg-100 mb-[20px] uppercase md:hidden'>{`дом №${objects[0].houseNumber}`}</div>
      <div className='flex w-full max-w-[911px] flex-col gap-[16px]'>
        <table className='w-full'>
          <thead>
            <tr className='text-center text-base-650'>
              <th className='text-base-400-reg-100 hidden uppercase text-base-600 md:table-cell md:pb-[20px]'>{`дом №${objects[0].houseNumber}`}</th>
              {showHeading(objects[0].characteristics)}
            </tr>
          </thead>
          <tbody>
            {objects.map((object) => (
              <tr className='group cursor-pointer text-center' onClick={() => setObject(object)} key={object.id}>
                <td className='hidden items-center justify-center rounded-bl-[16px] rounded-tl-[16px] after:block after:size-[24px] after:bg-icon-grid-view after:bg-default-auto group-hover:bg-primary group-hover:after:filter-base-100 group-[:nth-child(odd):hover]:bg-primary group-[:nth-child(odd)]:bg-base-200 md:flex md:py-[17px]'></td>
                {showCharacteristics(object.characteristics)}
              </tr>
            ))}
          </tbody>
        </table>
        <Button variation='outline' text='показать ещё 32 объекта' size='medium' className='w-full' />
      </div>
      <div className='hidden max-w-[380px] md:block'>
        {object && <div className='rounded-[32px] border border-base-400 p-[24px]'>{objectEl}</div>}
      </div>
    </div>
  )
}

export default ObjectsList
