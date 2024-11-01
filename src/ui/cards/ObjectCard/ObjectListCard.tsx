import React from 'react'
import { DefaultObject } from '@/types/catalog/DefaultObject'
import Link from 'next/link'
import { ActionButton } from '@/ui/cards/ObjectCard/ActionButton'
import { generateObjectLink } from '@/features/link'
import Gallery from '@/ui/cards/ObjectCard/Gallery'
import Tags from '@/components/Tags'

interface Props {
  item: DefaultObject
}

function ObjectListCard({ item }: Props) {
  const link = generateObjectLink(item)

  return (
    <div className='group/object-card flex w-full rounded-[32px] border border-base-400 p-[40px]'>
      <div className='relative mr-[40px]'>
        {'tags' in item && item.tags && (
          <Tags className='left-[16px] top-[16px] md:right-[14px] md:top-[14px]' list={item.tags} />
        )}
        <Gallery images={item.gallery.images} count={item.gallery.count} link={link} />
      </div>
      <Link className='max-w-[570px]' href={link}>
        <div className='text-header-300 mb-[12px]'>{item.name}</div>
        {!!item.address && (
          <span className='text-base-300-lg-100 flex gap-[4px] text-base-600/50 before:size-[24px] before:bg-icon-address before:opacity-50 before:filter-base-600 before:bg-default'>
            {item.address}
          </span>
        )}
        <div className='text-header-400 mb-[40px]'>{item.price} ₽</div>
        <div className='text-base-600/50'>{item.description}</div>
      </Link>
      <div className='ml-auto flex flex-col items-end'>
        <div className='flex gap-[8px]'>
          <ActionButton className='!bg-base-300 before:bg-icon-scale before:!filter-base-600 md:opacity-0' />
          <ActionButton className='!bg-base-300 before:bg-icon-address before:!filter-base-600 md:opacity-0' />
          <ActionButton className='!bg-base-300 before:bg-icon-heart before:!filter-base-600' />
        </div>
        <span className='mt-auto flex gap-[4px] text-base-600/50 before:relative before:top-[1px] before:block before:size-[19px] before:bg-icon-clip before:opacity-50 before:filter-base-600 before:bg-default'>
          5 мин назад
        </span>
      </div>
    </div>
  )
}

export default ObjectListCard
