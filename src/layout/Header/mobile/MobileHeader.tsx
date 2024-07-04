import React from 'react'
import Image from 'next/image'

import Logo from '@/assets/static/logo.svg'
import MobileMenuButton from '@/layout/Header/mobile/MobileMenuButton'

interface Props {
  className?: string
}

function MobileHeader({ className }: Props) {
  return (
    <header
      className={`header fixed z-20 pt-[15px] px-[20px] pb-[11px] w-[100%] flex justify-between items-center transition-colors peer-[:is(.is-scrolled,.menu-open)]/style-state:bg-base-100 peer-[:is(.is-scrolled,.menu-open)]/style-state:text-base-600 peer-[.catalog-menu]/style-state:hidden ${className}`}
    >
      <span className='absolute inset-x-[20px] bottom-0 h-[1px] block bg-base-100/[.15] pointer-events-none transition-[inset] peer-any-parent-[.is-scrolled]/style-state:bg-base-600/[.10] peer-any-parent-[.is-scrolled]/style-state:inset-x-0 peer-any-parent-[.menu-open]/style-state:hidden' />
      <MobileMenuButton />
      <Image
        className='w-[120px] h-[26px] object-contain object-center transition-[filter] peer-any-parent-[:is(.is-scrolled,.menu-open)]/style-state:filter-primary'
        src={Logo}
        alt='Логотип компании Эверест'
      />
      <button
        className='circle-[36px] flex flex-col gap-[4px] justify-center items-center bg-base-115 after:size-[20px] after:bg-default after:bg-icon-phone transition-colors after:transition-colors peer-any-parent-[:is(.is-scrolled,.menu-open)]/style-state:bg-base-300 peer-any-parent-[:is(.is-scrolled,.menu-open)]/style-state:after:filter-base-600'
        type='button'
        title='Звонок'
      />
    </header>
  )
}

export default MobileHeader
