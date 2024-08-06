import React from 'react'

import Image from 'next/image'
import { Complex } from '@/types/Complex'
import CardInfo from '@/components/Cards/Complex/CardInfo'
import Link from 'next/link'
import { COMPLEXES_CATEGORY, generateObjectLink } from '@/features/link'

import { Tag } from '@/types/Tag'

export function showTags(tags: Tag[]) {
  return tags.map((tag) => (
    <div
      className='text-base-400-lg-100 flex w-fit items-center justify-center rounded-[10px] bg-base-600 px-[8px] py-[5px] text-base-100 md:px-[12px] md:py-[6.5px]'
      key={tag.id}
    >
      {tag.name}
    </div>
  ))
}

interface Props {
  item: Complex
}

function ComplexCard({ item }: Props) {
  const link = generateObjectLink(item, COMPLEXES_CATEGORY)

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

export default ComplexCard
