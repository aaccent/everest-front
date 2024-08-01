import React from 'react'
import { Complex, FlatTypes } from '@/types/Complex'
import Link from 'next/link'
import { showTags } from '@/components/Cards/Complex/ComplexCard'
import { formatPrice } from '@/features/price'
import { formatStatus } from '@/features/date'
import Img from '@/ui/Img'
import { generateCategoryLink } from '@/features/link'

function showObjectTypes(objectTypes: FlatTypes[]) {
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
        <div className=''>{formatPrice(Number(object.minPrice))}</div>
      </div>
    )
  })
}

interface Props {
  item: Complex
}

function ComplexFullCard({ item: props }: Props) {
  return (
    <Link
      href={generateCategoryLink(props, { code: 'new-building/complexes' })}
      className='relative flex rounded-[32px] border border-base-400 p-[40px]'
    >
      <Img
        className='mr-[40px] rounded-[20px] object-cover object-center'
        src='/no-photo.jpg'
        width={427}
        height={342}
      />
      <div className='absolute left-[54px] top-[54px] flex gap-[4px]'>{props.tags && showTags(props.tags)}</div>
      <div>
        <div className='mb-[12px] flex items-center gap-[16px]'>
          <span className='text-header-300'>{props.name}</span>
          <div className='text-base-400-lg-100 rounded-[10px] border border-base-400 px-[12px] py-[6.5px]'>
            {formatStatus(props.status)}
          </div>
        </div>
        <div className='text-base-200-lg-100 mb-[17px] flex items-center gap-[10px] opacity-50 before:block before:h-[15px] before:w-[12px] before:bg-icon-address before:bg-default-auto'>
          {props.address ? props.address : 'нет адреса'}
        </div>
        <span className='text-header-400 mr-[12px]'>{formatPrice(props.minPrice)}</span>
        <span className='text-header-400 line-through opacity-50'>{formatPrice(props.priceDiscount)}</span>
        <div className='mt-[40px] flex flex-col gap-[9px]'>{showObjectTypes(props.objectsType)}</div>
      </div>
      <div className='ml-auto flex flex-col justify-between'>
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

export default ComplexFullCard
