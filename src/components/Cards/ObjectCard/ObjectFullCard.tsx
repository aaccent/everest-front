import React from 'react'
import { CategoryObject } from '@/types/CategoryObject'
import Link from 'next/link'
import Img from '@/ui/Img'
import { ActionButton } from '@/components/Cards/ObjectCard/ActionButton'

interface Props {
  item: CategoryObject
}

function ObjectFullCard({ item }: Props) {
  const link = '#'

  return (
    <div className='group/object-card flex w-full rounded-[32px] border border-base-400 p-[40px]'>
      <Link className='mr-[40px]' href={link}>
        <Img className='!h-[310px] !w-[472px] rounded-[20px]' src='/no-photo.jpg' width={472} height={310} />
      </Link>
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

export default ObjectFullCard
