'use client'
import React, { useState } from 'react'
import { Characteristics, ComplexDetailedHouse, LayoutObject } from '@/types/Complex'
import Button from '@/ui/buttons/Button'
import ObjectCard from '@/components/Cards/ObjectCard/ObjectCard'
import Row from '@/ui/Row'
import Cell from '@/ui/Cell'

function isHidden(value: string | number) {
  return value === 'Номер квартиры' || value === 'Тип отделки' ? 'hidden md:table-cell' : ''
}

function showHeadRow(characteristics: Characteristics[], houseNumber: number) {
  return (
    <Row className='text-base-400-lg-100 text-base-650'>
      <th className='text-base-400-reg-100 hidden uppercase text-base-600 md:table-cell'>{`дом №${houseNumber}`}</th>
      {characteristics.map((item, index) => (
        <Cell content={item.name} thead key={index} className={`${isHidden(item.name)}`} />
      ))}
    </Row>
  )
}

function showCharacteristicsCells(characteristics: Characteristics[]) {
  return characteristics.map((item, index) => (
    <Cell
      content={item.value}
      key={index}
      className={`text-base-400-lg-100 py-[20px] last:rounded-br-[16px] last:rounded-tr-[16px] group-hover:bg-primary group-hover:text-base-100 group-[:nth-child(odd):hover]:bg-primary group-[:nth-child(odd)]:bg-base-200 md:table-cell md:py-[17px] md:last:rounded-br-[16px] md:last:rounded-tr-[16px] [&:nth-child(2)]:rounded-l-[20px] md:[&:nth-child(2)]:rounded-l-none ${isHidden(item.name)} `}
    />
  ))
}

function ObjectsList({ objects }: ComplexDetailedHouse) {
  const [activeObject, setActiveObject] = useState<LayoutObject | null>(null)

  function showBody() {
    return objects.map((object) => {
      return (
        <Row className='group cursor-pointer text-center' onClick={() => setActiveObject(object)} key={object.id}>
          <td className='hidden items-center justify-center rounded-bl-[16px] rounded-tl-[16px] after:block after:size-[24px] after:bg-icon-grid-view after:bg-default-auto group-hover:bg-primary group-hover:after:filter-base-100 group-[:nth-child(odd):hover]:bg-primary group-[:nth-child(odd)]:bg-base-200 md:flex md:py-[17px]'></td>
          {showCharacteristicsCells(object.characteristics)}
        </Row>
      )
    })
  }

  // TODO: Решить проблему с формированием ссылок, сделать более дружелюбнее
  // @ts-expect-error Временно
  const objectEl = activeObject ? <ObjectCard item={activeObject} /> : null

  return (
    <div className='mb-[32px] justify-between last:mb-0 md:mb-[64px] md:flex'>
      <div className='text-base-400-reg-100 mb-[20px] uppercase md:hidden'>{`дом №${objects[0].houseNumber}`}</div>
      <div className='flex w-full max-w-[911px] flex-col gap-[16px]'>
        <table className='w-full'>
          <thead>{showHeadRow(objects[0].characteristics, objects[0].houseNumber)}</thead>
          <tbody>{showBody()}</tbody>
        </table>
        <Button variation='outline' text='показать ещё 32 объекта' size='medium' className='w-full' />
      </div>
      <div className='hidden max-w-[380px] md:block'>
        {activeObject && <div className='rounded-[32px] border border-base-400 p-[24px]'>{objectEl}</div>}
      </div>
    </div>
  )
}

export default ObjectsList
