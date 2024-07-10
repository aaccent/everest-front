import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { suggestionPlural } from '@/features/pluralRules'
import { Category } from '@/types/Category'
import { SubCategory } from '@/types/SubCategory'

function MenuItemCard({ name, seoUrl }: SubCategory) {
  return (
    <Link className='flex items-center gap-[12px] rounded-[24px] bg-base-200 p-[16px]' href={seoUrl}>
      <div className='relative size-[52px] flex-shrink-0 overflow-hidden rounded-[16px]'>
        <Image className='object-cover' src={'/no-photo.jpg'} fill alt='' />
      </div>
      <div className='flex flex-col gap-[4px]'>
        <span className='text-base-300-reg-100-upper'>{name}</span>
        <span className='text-base-400-lg-100 text-base-600/50'>
          {1} {suggestionPlural.get(1)}
        </span>
      </div>
    </Link>
  )
}

export default MenuItemCard
