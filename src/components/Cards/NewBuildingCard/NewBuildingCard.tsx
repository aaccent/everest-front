import React from 'react'

import Image from 'next/image'
import { NewBuilding } from '@/components/Cards/CardsTypes'
import CardInfo from '@/components/Cards/NewBuildingCard/CardInfo'
import Link from 'next/link'

function NewBuildingCard(props: NewBuilding) {
  function showTags() {
    return (
      <div className='absolute top-[10px] left-[8px] flex gap-[4px] md:top-[14px] md:left-[14px]'>
        {props.tags.map((tag, index) => (
          <div
            className='flex justify-center items-center py-[5px] px-[8px] w-fit rounded-[10px] bg-base-600 text-base-100 text-base-400-lg-100 md:py-[6.5px] md:px-[12px]'
            key={index}
          >
            {tag}
          </div>
        ))}
      </div>
    )
  }

  return (
    <Link
      href={'#'}
      className='group w-full h-[250px] relative rounded-[20px] block overflow-hidden md:h-[388px] md:rounded-[24px]'
    >
      <Image
        className='object-center object-cover  transition-transform duration-500 hover:scale-110 hover:transition-transform hover:duration-500'
        src={props.photos[0]}
        alt={''}
        fill
      />

      {showTags()}
      <CardInfo {...props} />
    </Link>
  )
}

export default NewBuildingCard
