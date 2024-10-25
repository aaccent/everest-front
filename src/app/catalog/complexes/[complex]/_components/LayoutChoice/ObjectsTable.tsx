import React from 'react'

import Row from '@/ui/Row'
import Cell, { CellProps } from '@/ui/Cell'

import { DetailComplex } from '@/types/catalog/Complex'
import ActiveLayoutCard from '@/app/catalog/complexes/[complex]/_components/LayoutChoice/ActiveLayoutCard'
import { getComplexHouseObjects } from '@/globals/api/methods/complex/getComplexHouseObjects'
import { ComplexHouse, ComplexHouseObject } from '@/types/complex/ComplexHouse'
import { formatFullPrice } from '@/features/utility/price'

function HeadRow({ houseNumber }: { houseNumber: string }) {
  return (
    <Row className='text-base-400-lg-100 text-base-650'>
      <th className='text-base-400-reg-100 hidden uppercase text-base-600 md:table-cell md:pb-[20px]'>{`дом №${houseNumber}`}</th>
      <Cell thead content='Секция' className='pb-[10px] md:pb-[20px]' />
      <Cell thead content='Кв.№' className='hidden pb-[10px] md:table-cell md:pb-[20px]' />
      <Cell thead content='Комнат' className='pb-[10px] md:pb-[20px]' />
      <Cell thead content='Площадь' className='pb-[10px] md:pb-[20px]' />
      <Cell thead content='Этаж' className='pb-[10px] md:pb-[20px]' />
      <Cell thead content='Тип отделки' className='hidden pb-[10px] md:table-cell md:pb-[20px]' />
      <Cell thead content='Стоимость' className='pb-[10px] md:pb-[20px]' />
    </Row>
  )
}

function BodyCell({ className, content }: Omit<CellProps, 'thead'>) {
  return (
    <Cell
      content={content}
      className={`text-base-400-lg-100 py-[20px] last:rounded-br-[16px] last:rounded-tr-[16px] group-hover:bg-primary group-hover:text-base-100 group-[.active:nth-child(odd)]:bg-primary group-[.active]:bg-primary group-[:nth-child(odd):hover]:bg-primary group-[:nth-child(odd)]:bg-base-200 group-[.active]:text-base-100 md:table-cell md:py-[17px] md:last:rounded-br-[16px] md:last:rounded-tr-[16px] [&:nth-child(2)]:rounded-l-[20px] md:[&:nth-child(2)]:rounded-l-none ${className} `}
    />
  )
}

function outputValue(rawValue: string | number | null) {
  if (!rawValue) return ''

  return rawValue
}

function TableBody({ objects }: { objects: ComplexHouseObject[] }) {
  return objects.map((object) => (
    <Row className='group cursor-pointer text-center' key={object.id} object={object}>
      <td className='hidden items-center justify-center rounded-bl-[16px] rounded-tl-[16px] after:block after:size-[24px] after:bg-icon-grid-view after:bg-default-auto group-hover:bg-primary group-hover:after:filter-base-100 group-[.active:nth-child(odd)]:bg-primary group-[.active]:bg-primary group-[:nth-child(odd):hover]:bg-primary group-[:nth-child(odd)]:bg-base-200 group-[.active]:after:filter-base-100 md:flex md:py-[17px]' />
      <BodyCell content={outputValue(object.section)} />
      <BodyCell className='hidden md:table-cell' content={outputValue(object.flatNumber)} />
      <BodyCell content={outputValue(object.room)} />
      <BodyCell content={outputValue(object.square)} />
      <BodyCell content={outputValue(object.floor)} />
      <BodyCell className='hidden md:table-cell' content={outputValue(object.finishType)} />
      <BodyCell className='text-system-green' content={formatFullPrice(object.price)} />
    </Row>
  ))
}

function HouseTable({ house }: { house: ComplexHouse }) {
  return (
    <div className='mb-[32px] last:mb-0 md:mb-[64px]'>
      <div className='text-base-400-reg-100 mb-[20px] uppercase md:hidden'>{`дом №${house.houseNumber}`}</div>
      <div className='flex w-full max-w-[911px] flex-col gap-[16px]'>
        <table className='w-full'>
          <thead>
            <HeadRow houseNumber={house.houseNumber} />
          </thead>
          <tbody>
            <TableBody objects={house.list} />
          </tbody>
        </table>
      </div>
      <div className='hidden max-w-[380px] md:block'></div>
    </div>
  )
}

async function ObjectsTable({ complex }: { complex: DetailComplex }) {
  const houses = await Promise.all(
    complex.houseNumbers.map((houseNumber) => {
      return getComplexHouseObjects(complex.seoUrl, houseNumber, { perPage: 9 })
    }),
  )

  function showHousesTable() {
    return houses.map((house, index) => <HouseTable house={house} key={index} />)
  }

  return (
    <>
      <div className='w-full md:max-w-[910px]'>{showHousesTable()}</div>
      <ActiveLayoutCard complex={complex} />
    </>
  )
}

export default ObjectsTable
