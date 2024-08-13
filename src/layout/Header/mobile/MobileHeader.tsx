import React from 'react'
import Image from 'next/image'

import Logo from '@/assets/static/logo.svg'
import MobileMenuButton from '@/layout/Header/mobile/MobileMenuButton'
import CallPopupButton from '@/layout/Header/components/CallPopupButton'

interface Props {
  className?: string
}

function MobileHeader({ className }: Props) {
  return (
    <header
      className={`header px-container fixed left-0 top-0 z-20 flex w-[100%] items-center justify-between pb-[11px] pt-[15px] transition-colors peer-[.is-black]/header-state:sticky peer-[[data-menu="catalog"]]/header-state:hidden peer-[.is-black]/header-state:bg-base-100 peer-[.is-black]/header-state:text-base-600 ${className}`}
    >
      <span className='pointer-events-none absolute inset-x-[20px] bottom-0 block h-[1px] bg-base-100/15 transition-[inset] peer-any-parent-[.is-black]/header-state:inset-x-0 peer-any-parent-[[data-menu]]/header-state:hidden peer-any-parent-[.is-black]/header-state:bg-base-600/10' />
      <MobileMenuButton />
      <Image
        className='h-[26px] w-[120px] object-contain object-center transition-[filter] peer-any-parent-[.is-black]/header-state:filter-primary'
        src={Logo}
        alt='Логотип компании Эверест'
      />
      <CallPopupButton />
    </header>
  )
}

export default MobileHeader
