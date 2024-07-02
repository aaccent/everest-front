import React from 'react'
import Image from 'next/image'

import Logo from '@/assets/static/logo.svg'

interface Props {
  className?: string
}

function MobileHeader({ className }: Props) {
  const scrollingStyles = 'peer-[.is-scrolled]/style-state:bg-base-100 peer-[.is-scrolled]/style-state:text-base-600'

  return (
    <header
      className={`group/header fixed z-20 pt-[8px] px-[20px] pb-[11px] w-[100%] flex justify-between items-center transition-colors ${scrollingStyles} ${className}`}
    >
      <div className='absolute left-0 bottom-0 px-[20px] w-full h-full flex items-end pointer-events-none transition-[padding] group-peer-[.is-scrolled]/header:px-0'>
        <span className='w-full h-[1px] block bg-base-100/[.15]' />
      </div>
      <button
        className='circle-[36px] flex flex-col gap-[4px] justify-center items-center bg-base-115 transition-colors group-peer-[.is-scrolled]/header:bg-base-300'
        type='button'
        title='Меню'
      >
        <span className='size-[20px] flex flex-col gap-[4px] justify-center pseudo:relative pseudo:h-[1.8px] before:left-[1px] after:left-[1px] before:w-[18px] pseudo:block pseudo:bg-base-100 after:w-[14px] transition-colors group-peer-[.is-scrolled]/header:pseudo:bg-base-600' />
      </button>
      <Image
        className='w-[120px] h-[26px] object-contain object-center transition-[filter] group-peer-[.is-scrolled]/header:filter-primary'
        src={Logo}
        alt='Логотип компании Эверест'
      />
      <button
        className='circle-[36px] flex flex-col gap-[4px] justify-center items-center bg-base-115 after:size-[20px] after:bg-no-repeat after:bg-center after:bg-icon-phone transition-colors after:transition-colors group-peer-[.is-scrolled]/header:bg-base-300 group-peer-[.is-scrolled]/header:after:filter-base-600'
        type='button'
        title='Звонок'
      />
    </header>
  )
}

export default MobileHeader
