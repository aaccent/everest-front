import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { suggestionPlural } from '@/features/pluralRules'

interface Props {
  title: string
  link: string
  amount: number
  image: string
}

function MenuItemCard({ title, amount = 42, image = '/no-photo.jpg', link = '#' }: Props) {
  return (
    <Link className='flex items-center gap-[12px] rounded-[24px] bg-base-200 p-[16px]' href={link}>
      <div className='relative size-[52px] flex-shrink-0 overflow-hidden rounded-[16px]'>
        <Image className='object-cover' src={image} fill alt='' />
      </div>
      <div className='flex flex-col gap-[4px]'>
        <span className='text-base-300-reg-100-upper'>{title}</span>
        <span className='text-base-400-lg-100 text-base-600/50'>
          {amount} {suggestionPlural.get(amount)}
        </span>
      </div>
    </Link>
  )
}

export default MenuItemCard
