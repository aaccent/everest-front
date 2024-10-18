import React from 'react'

import Row from '@/ui/Row'
import Cell from '@/ui/Cell'

import { DetailComplex, DetailComplexHouse, LayoutObject } from '@/types/catalog/Complex'
import { Characteristic } from '@/types/Characteristic'
import ActiveLayoutCard from '@/app/catalog/complexes/[complex]/_components/LayoutChoice/ActiveLayoutCard'

function isHidden(value: string | number) {
  return value === 'Номер квартиры' || value === 'Тип отделки' ? 'hidden md:table-cell' : ''
}

function HeadRow({ characteristics, houseNumber }: { characteristics: Characteristic[]; houseNumber: number }) {
  return (
    <Row className='text-base-400-lg-100 text-base-650'>
      <th className='text-base-400-reg-100 hidden uppercase text-base-600 md:table-cell md:pb-[20px]'>{`дом №${houseNumber}`}</th>
      {characteristics.map((item, index) => (
        <Cell content={item.name} thead key={index} className={`md:pb-[20px] ${isHidden(item.name)}`} />
      ))}
    </Row>
  )
}

function CharacteristicsCells({ characteristics }: { characteristics: Characteristic[] }) {
  return characteristics.map((item, index) => (
    <Cell
      content={item.value}
      key={index}
      className={`text-base-400-lg-100 py-[20px] last:rounded-br-[16px] last:rounded-tr-[16px] group-hover:bg-primary group-hover:text-base-100 group-[.active]:bg-primary group-[:nth-child(odd):hover]:bg-primary group-[:nth-child(odd)]:bg-base-200 group-[.active]:text-base-100 md:table-cell md:py-[17px] md:last:rounded-br-[16px] md:last:rounded-tr-[16px] [&:nth-child(2)]:rounded-l-[20px] md:[&:nth-child(2)]:rounded-l-none ${isHidden(item.name)} `}
    />
  ))
}

interface ObjectsTableProps {
  complex: DetailComplex
}

function TableBody({ objects }: { objects: LayoutObject[] }) {
  return objects.map((object) => (
    <Row className='group cursor-pointer text-center' key={object.id} object={object}>
      <td className='hidden items-center justify-center rounded-bl-[16px] rounded-tl-[16px] after:block after:size-[24px] after:bg-icon-grid-view after:bg-default-auto group-hover:bg-primary group-hover:after:filter-base-100 group-[.active]:bg-primary group-[:nth-child(odd):hover]:bg-primary group-[:nth-child(odd)]:bg-base-200 group-[.active]:after:filter-base-100 md:flex md:py-[17px]'></td>
      <CharacteristicsCells characteristics={object.characteristics} />
    </Row>
  ))
}

function HouseTable({ house }: { house: DetailComplexHouse }) {
  return (
    <div className='mb-[32px] last:mb-0 md:mb-[64px]'>
      <div className='text-base-400-reg-100 mb-[20px] uppercase md:hidden'>{`дом №${house.objects[0].houseNumber}`}</div>
      <div className='flex w-full max-w-[911px] flex-col gap-[16px]'>
        <table className='w-full'>
          <thead>
            <HeadRow characteristics={house.objects[0].characteristics} houseNumber={house.objects[0].houseNumber} />
          </thead>
          <tbody>
            <TableBody objects={house.objects} />
          </tbody>
        </table>
      </div>
      <div className='hidden max-w-[380px] md:block'></div>
    </div>
  )
}

function ObjectsTable({ complex }: ObjectsTableProps) {
  function showHousesTable() {
    return complex.objects.map((house, index) => <HouseTable house={house} key={index} />)
  }

  return (
    <>
      <div className='w-full md:max-w-[910px]'>{showHousesTable()}</div>
      <ActiveLayoutCard complex={complex} />
    </>
  )
}

export default ObjectsTable
