import React from 'react'
import { ComplexObject, FlatType } from '@/types/catalog/Complex'
import Link from 'next/link'
import { formatPriceShortBy } from '@/features/utility/price'
import { formatStatusByQuarter } from '@/features/utility/date'
import Img from '@/ui/Img'
import { createComplexLink } from '@/features/catalog/link'
import Tags from '@/components/Tags'

function showObjectTypes(objectTypes: FlatType[]) {
  return objectTypes.map((object) => {
    return (
      <div
        className='text-base-400-lg-100 group flex justify-between border-b border-b-base-600/10 pb-[9px] text-base-600 last:border-b-0'
        key={object.id}
      >
        <div className='w-[80px] group-hover:text-primary md:w-[120px]'>{object.name}</div>
        <div className='text-base-650'>
          от {object.minArea} м<sup>2</sup>
        </div>
        <div className=''>{formatPriceShortBy(Number(object.minPrice))}</div>
      </div>
    )
  })
}

interface Props {
  item: ComplexObject
}

function ComplexListCard({ item }: Props) {
  return (
    <Link href={createComplexLink(item)} className='relative flex rounded-[32px] border border-base-400 p-[40px]'>
      <Img
        className='mr-[40px] rounded-[20px] object-cover object-center'
        src='/no-photo.jpg'
        width={427}
        height={342}
      />
      <Tags className='left-[54px] top-[54px]' list={item.tags} />
      <div>
        <div className='mb-[12px] flex items-center gap-[16px]'>
          <span className='text-header-300'>{item.name}</span>
          <div className='text-base-400-lg-100 rounded-[10px] border border-base-400 px-[12px] py-[6.5px]'>
            {formatStatusByQuarter(item.status)}
          </div>
        </div>
        <div className='text-base-200-lg-100 mb-[17px] flex items-center gap-[10px] opacity-50 before:block before:h-[15px] before:w-[12px] before:bg-icon-address before:bg-default-auto'>
          {item.address ? item.address : 'нет адреса'}
        </div>
        <span className='text-header-400 mr-[12px]'>{formatPriceShortBy(item.minPrice)}</span>
        {!!item.minPriceDiscount && (
          <span className='text-header-400 line-through opacity-50'>{formatPriceShortBy(item.minPriceDiscount)}</span>
        )}
        <div className='mt-[40px] flex flex-col gap-[9px]'>{showObjectTypes(item.objectsType)}</div>
      </div>
      <div className='relative ml-auto flex flex-col justify-between'>
        <Img className='absolute right-0 top-0 !h-[26px] !w-[102px]' src={item.developerLogo} width={102} height={26} />
        <div className='relative'>
          <Img src='/icons/donstroy.svg' isSVG />
        </div>
        <div className='text-base-300-lg-100 flex gap-[6px] text-base-650 before:size-[19px] before:bg-icon-clip before:bg-default-auto after:block'>
          5 мин назад
        </div>
      </div>
    </Link>
  )
}

export default ComplexListCard
