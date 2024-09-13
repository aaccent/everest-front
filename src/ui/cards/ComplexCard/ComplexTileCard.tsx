import { createComplexLink } from '@/features/link'
import Link from 'next/link'
import Image from 'next/image'
import CardInfo from '@/ui/cards/ComplexCard/CardInfo'
import React from 'react'
import { ComplexCard as ComplexCardType } from '@/types/Complex'
import Tags from '@/components/Tags'

interface Props {
  item: ComplexCardType
}

export function ComplexTileCard({ item }: Props) {
  const link = createComplexLink(item)

  return (
    <div className='relative block h-[250px] w-full overflow-hidden rounded-[20px] md:h-[388px] md:rounded-[24px]'>
      <Link href={link}>
        <Image
          className='object-cover object-center transition-transform duration-500 hover:scale-110 hover:transition-transform hover:duration-500'
          src='/no-photo.jpg'
          alt=''
          fill
        />
      </Link>
      <Tags className='left-[8px] top-[10px] md:left-[14px] md:top-[14px]' list={item.tags} />
      <CardInfo complex={item} link={link} />
    </div>
  )
}
