import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import { ObjectCard as ObjectCardType } from '@/types/ObjectCard'
import { ActionButton } from '@/ui/cards/ObjectCard/ActionButton'
import { CategoryForGeneratingLink, generateObjectLink } from '@/features/catalog/link'
import { LayoutObject } from '@/types/Complex'
import Gallery from '@/ui/cards/ObjectCard/Gallery'
import Tags from '@/components/Tags'

function InfoItem({ children }: PropsWithChildren) {
  return <li className='text-base-400-lg-100 rounded-[10px] border border-base-400 px-[12px] py-[8px]'>{children}</li>
}

interface Props {
  category: CategoryForGeneratingLink
  item: ObjectCardType | LayoutObject
}

const test = ['/slider-3.png', '/slider-1.png', '/slider-2.png']

function ObjectCard({ item, category }: Props) {
  const link = generateObjectLink(item, category)

  return (
    <div className='group/object-card'>
      <div className='relative mb-[22px]'>
        {'tags' in item && item.tags && (
          <Tags className='left-[16px] top-[16px] md:right-[14px] md:top-[14px]' list={item.tags} />
        )}
        <div className='absolute right-[16px] top-[16px] z-10 flex gap-[4px] md:right-[14px] md:top-[14px] md:gap-[8px]'>
          <ActionButton className='before:bg-icon-scale md:opacity-0' />
          <ActionButton className='before:bg-icon-address md:opacity-0' />
          <ActionButton className='before:bg-icon-heart' />
        </div>
        <Gallery images={item.gallery.images} count={item.gallery.count} link={link} />
      </div>
      <Link href={link}>
        <div className='text-header-400 mb-[12px] md:mb-[14px]'>{item.price} ₽</div>
        <ul className='mb-[8px] flex gap-[6px] md:mb-[12px]'>
          <InfoItem>1 комн</InfoItem>
          <InfoItem>35м²</InfoItem>
          <InfoItem>2/9 этаж</InfoItem>
        </ul>
        <div>
          {!!item.address && (
            <span className='text-base-300-lg-100 flex gap-[4px] text-base-600/50 before:size-[24px] before:bg-icon-address before:opacity-50 before:filter-base-600 before:bg-default'>
              {item.address}
            </span>
          )}
          <span className='flex gap-[4px] text-base-600/50 before:relative before:top-[1px] before:block before:size-[19px] before:bg-icon-clip before:opacity-50 before:filter-base-600 before:bg-default'>
            5 мин назад
          </span>
        </div>
      </Link>
    </div>
  )
}

export default ObjectCard
