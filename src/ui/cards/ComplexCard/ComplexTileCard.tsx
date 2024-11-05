import { createComplexLink } from '@/features/link'
import Link from 'next/link'
import CardInfo from '@/ui/cards/ComplexCard/CardInfo'
import React from 'react'
import { ComplexObject } from '@/types/catalog/Complex'
import Tags from '@/components/Tags'
import Img from '@/ui/Img'
import { TEST_ID } from '@/globals/testIds'

interface Props {
  item: ComplexObject
  className?: string
  isBanner?: boolean
}

export function ComplexTileCard({ item, className, isBanner = false }: Props) {
  const link = createComplexLink(item)

  return (
    <div
      className={`relative block h-[250px] w-full overflow-hidden rounded-[20px] md:h-[388px] md:rounded-[24px] ${className}`}
    >
      <Link className='block h-full' href={link} data-testid={TEST_ID.COMPLEX_CARD}>
        <Img
          className='object-cover object-center transition-transform duration-500 hover:scale-110 hover:transition-transform hover:duration-500'
          src={item.mainImg}
          alt=''
          fill
        />
      </Link>
      <Tags className='left-[8px] top-[10px] md:left-[14px] md:top-[14px]' list={item.tags} />
      <CardInfo complex={item} link={link} isBanner={isBanner} />
    </div>
  )
}
