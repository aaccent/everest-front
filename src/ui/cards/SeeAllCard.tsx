import React from 'react'
import Link from 'next/link'

interface Props {
  link: string
  className?: string
}

function SeeAllCard({ link, className }: Props) {
  return (
    <Link
      href={link}
      className={`relative block max-w-[320px] shrink-0 grow-0 basis-full rounded-[20px] bg-base-300 p-[16px] md:max-w-[512px] md:rounded-[32px] md:p-[32px] ${className} `}
    >
      <div className='ml-auto flex size-[40px] items-center justify-center rounded-full bg-base-100 after:block after:size-[12px] after:-rotate-45 after:bg-icon-arrow after:bg-contain after:bg-center after:bg-no-repeat after:filter-base-600 md:size-[80px]' />
      <div className='text-header-300 absolute bottom-[16px] left-[16px] md:bottom-[32px] md:left-[32px]'>
        Смотреть все
      </div>
    </Link>
  )
}

export default SeeAllCard
