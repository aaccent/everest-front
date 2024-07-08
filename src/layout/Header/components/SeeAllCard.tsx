import React from 'react'
import { suggestionPlural } from '@/features/pluralRules'
import Link from 'next/link'

interface Props {
  amount?: number
  link?: string
}

function SeeAllCard({ amount = 42, link = '#' }: Props) {
  return (
    <Link className='flex items-center gap-[12px] rounded-[24px] bg-base-200 p-[16px]' href={link}>
      <div className='flex size-[52px] flex-shrink-0 items-center justify-center rounded-[12px] bg-primary after:size-[20px] after:bg-icon-more-houses after:filter-base-100 after:bg-default' />
      <div className='flex flex-col gap-[4px]'>
        <span className='text-base-300-reg-100-upper'>Смотреть все</span>
        <span className='text-base-400-lg-100 text-base-600/50'>
          {amount} {suggestionPlural.get(amount)}
        </span>
      </div>
    </Link>
  )
}

export default SeeAllCard