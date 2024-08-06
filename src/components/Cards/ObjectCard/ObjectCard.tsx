import React, { PropsWithChildren } from 'react'
import Link from 'next/link'
import Img from '@/ui/Img'
import { CategoryObject } from '@/types/CategoryObject'
import { ActionButton } from '@/components/Cards/ObjectCard/ActionButton'
import { AnyCategory } from '@/types/Category'
import { generateObjectLink } from '@/features/link'
import { LayoutObject } from '@/types/Complex'

function InfoItem({ children }: PropsWithChildren) {
  return <li className='text-base-400-lg-100 rounded-[10px] border border-base-400 px-[12px] py-[8px]'>{children}</li>
}

interface Props {
  category: AnyCategory
  item: CategoryObject | LayoutObject
}

function ObjectCard({ item, category }: Props) {
  function showTags() {
    return item.tags.map((tag) => (
      <li className='text-base-400-lg-100 rounded-[10px] bg-base-100 px-[8px] py-[5px] text-base-600' key={tag.id}>
        {tag.name}
      </li>
    ))
  }

  const link = generateObjectLink(item, category)

  return (
    <div className='group/object-card'>
      <div className='relative mb-[22px]'>
        {!!item.tags && (
          <ul className='absolute left-[16px] top-[16px] flex gap-[4px] md:right-[14px] md:top-[14px]'>{showTags()}</ul>
        )}
        <div className='absolute right-[16px] top-[16px] flex gap-[4px] md:right-[14px] md:top-[14px] md:gap-[8px]'>
          <ActionButton className='before:bg-icon-scale md:opacity-0' />
          <ActionButton className='before:bg-icon-address md:opacity-0' />
          <ActionButton className='before:bg-icon-heart' />
        </div>
        <Link href={link}>
          <Img className='h-[340px] w-[512px] rounded-[20px]' src='/no-photo.jpg' width={512} height={340} />
        </Link>
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
