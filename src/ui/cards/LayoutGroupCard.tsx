import React from 'react'
import { LayoutGroup } from '@/types/catalog/LayoutGroup'
import Link from 'next/link'
import Img from '@/ui/Img'
import { DetailComplex } from '@/types/catalog/Complex'
import { ROUTES } from '@/globals/paths'
import { convertToBase64 } from '@/features/utility/convertBase64'
import { showParams } from '@/ui/cards/showParams'

interface Props {
  item: LayoutGroup
  complex: DetailComplex
}

export default function LayoutGroupCard({ item, complex }: Props) {
  const link = `${ROUTES.COMPLEX_OBJECTS}/${complex.seoUrl}?filter=${convertToBase64(item.filters)}`

  return (
    <Link className='flex h-full flex-col rounded-[32px] border border-base-400 p-[24px]' href={link}>
      <div className='flex flex-col gap-[4px] md:gap-[6px]'>
        <span className='text-base-300-lg-100'>{item.name}</span>
        <span className='text-base-400-lg-100 text-base-600/50'>{item.count} квартир данного типа</span>
      </div>
      <Img
        className='mx-auto mb-[24px] mt-[32px] size-[250px] object-cover object-center md:mb-[32px] md:size-[300px]'
        src={item.image}
        width={300}
        height={300}
      />
      <div>
        <span className='text-header-400 mb-[12px] block md:mb-[14px]'>от {item.priceFrom} ₽</span>
        <ul className='mb-[8px] flex gap-[6px] md:mb-[12px]'>{showParams(item.params)}</ul>
        <span className='text-base-300-lg-100 flex items-center gap-[6px] text-base-600/50 before:size-[15px] before:bg-icon-address before:opacity-50 before:bg-default'>
          {item.address}
        </span>
      </div>
    </Link>
  )
}
