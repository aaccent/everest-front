import { createComplexLink } from '@/features/link'
import Link from 'next/link'
import Image from 'next/image'
import CardInfo from '@/components/Cards/Complex/CardInfo'
import React from 'react'
import { showTags } from '@/components/Cards/Complex/ComplexCard'
import { ComplexCard as ComplexCardType } from '@/types/Complex'

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
      <div className='absolute left-[8px] top-[10px] flex gap-[4px] md:left-[14px] md:top-[14px]'>
        {item.tags && showTags(item.tags)}
      </div>
      <CardInfo complex={item} link={link} />
    </div>
  )
}
