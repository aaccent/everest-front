import React from 'react'
import { suggestionPlural } from '@/features/pluralRules'
import Link from 'next/link'

interface Props {
  amount?: number
  link?: string
}

function SeeAllCard({ amount = 42, link = '#' }: Props) {
  return (
    <Link className='p-[16px] flex items-center gap-[12px] bg-base-200 rounded-[24px]' href={link}>
      <div className='size-[52px] flex justify-center items-center flex-shrink-0 rounded-[12px] bg-primary after:size-[20px] after:bg-default after:bg-icon-more-houses after:filter-base-100' />
      <div className='flex flex-col gap-[4px]'>
        <span className='text-base-300-reg-100-upper'>Смотреть все</span>
        <span className='text-base-400-lg-100 text-base-600/[.5]'>
          {amount} {suggestionPlural.get(amount)}
        </span>
      </div>
    </Link>
  )
}

export default SeeAllCard
