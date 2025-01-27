import React from 'react'
import Link from 'next/link'
import { DefaultObject as ObjectCardType } from '@/types/catalog/DefaultObject'
import { generateObjectLink } from '@/features/link'
import Gallery from '@/ui/cards/ObjectCard/Gallery'
import Tags from '@/components/Tags'
import { TEST_ID } from '@/globals/testIds'
import { formatFullPrice } from '@/features/utility/price'
import { showParams } from '@/ui/cards/showParams'
import { formatTime } from '@/features/utility/time'

interface Props {
  item: ObjectCardType
}

function ObjectCard({ item }: Props) {
  const link = generateObjectLink(item)

  return (
    <div className='group/object-card'>
      <Link href={link} className='relative mb-[22px] block'>
        {'tags' in item && item.tags && (
          <Tags className='left-[16px] top-[16px] md:right-[14px] md:top-[14px]' list={item.tags} />
        )}
        <div className='absolute right-[16px] top-[16px] z-10 flex gap-[4px] md:right-[14px] md:top-[14px] md:gap-[8px]'></div>
        <Gallery images={item.gallery.images} count={item.gallery.count} link={link} />
      </Link>
      <Link href={link} data-testid={TEST_ID.OBJECT_CARD}>
        <div className='mb-[12px] flex items-center gap-[8px] md:mb-[14px] md:gap-[12px]'>
          <div className='text-header-400'>{formatFullPrice(item.priceDiscount || item.price)}</div>
          {item.priceDiscount && (
            <div className='text-header-400 text-base-600 line-through opacity-50'>{formatFullPrice(item.price)}</div>
          )}
        </div>
        <ul className='mb-[8px] flex gap-[6px] md:mb-[12px]'>{showParams(item.characteristics)}</ul>
        <div className='flex flex-col gap-[8px]'>
          {!!item.address && (
            <span className='text-base-300-lg-100 flex gap-[4px] text-base-600/50 before:size-[19px] before:bg-icon-address before:opacity-50 before:filter-base-600 before:bg-default'>
              {item.address}
            </span>
          )}
          <span className='flex gap-[4px] text-base-600/50 before:relative before:top-[1px] before:block before:size-[19px] before:bg-icon-clip before:opacity-50 before:filter-base-600 before:bg-default'>
            {formatTime(item.publicationTime)}
          </span>
        </div>
      </Link>
    </div>
  )
}

export default ObjectCard
