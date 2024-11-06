import React from 'react'
import Link from 'next/link'
import { IconName, ICONS_NAME } from '@/globals/icons/icons'
import CatalogButton from '@/layout/Header/components/CatalogButton'

interface MenuButtonProps {
  iconName: IconName
  text: string
}

function MenuButton({ iconName, text }: MenuButtonProps) {
  return (
    <li className='w-full'>
      <Link
        className={`flex w-full flex-col items-center justify-center gap-[2px] before:size-[28px] before:bg-contain before:bg-center before:bg-no-repeat before:opacity-45 before:filter-base-600 before:bg-${ICONS_NAME[iconName]}`}
        href=''
      >
        {text}
      </Link>
    </li>
  )
}

function MobileMenu() {
  return (
    <aside className='mobile-menu fixed bottom-0 left-0 z-40 w-full rounded-t-[16px] border-t border-t-[#000]/[.12] bg-base-100 pb-[30px] text-[11px] text-base-600/[.5] peer-[[data-map-page]]/header-state:hidden'>
      <nav>
        <ul className='flex items-end justify-between'>
          <MenuButton iconName='PROFILE' text='Профиль' />
          <MenuButton iconName='SCALE' text='Сравнение' />
          <li className='w-full'>
            <CatalogButton />
          </li>
          <MenuButton iconName='HEART' text='Избранное' />
          <MenuButton iconName='SEARCH' text='Поиск' />
        </ul>
      </nav>
    </aside>
  )
}

export default MobileMenu
