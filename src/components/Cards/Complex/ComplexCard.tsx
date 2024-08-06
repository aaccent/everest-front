import React from 'react'

import Image from 'next/image'
import { Complex } from '@/types/Complex'
import CardInfo from '@/components/Cards/Complex/CardInfo'
import Link from 'next/link'
import { generateCategoryLink } from '@/features/link'

export function showTags(tags: string[]) {
  return tags.map((tag, index) => (
    <div
      className='text-base-400-lg-100 flex w-fit items-center justify-center rounded-[10px] bg-base-600 px-[8px] py-[5px] text-base-100 md:px-[12px] md:py-[6.5px]'
      key={index}
    >
      {tag}
    </div>
  ))
}

interface Props {
  item: Complex
}

function ComplexCard({ item: props }: Props) {
  const link = generateCategoryLink(props, { code: 'new-building/complexes' })
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
        {props.tags && showTags(props.tags)}
      </div>
      <CardInfo complex={{ ...props }} link={link} />
    </div>
  )
}

export default ComplexCard
