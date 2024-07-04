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
        className={`w-full flex flex-col justify-center gap-[2px] items-center before:size-[28px] before:bg-no-repeat before:bg-center before:bg-contain before:filter-base-600 before:opacity-45 before:bg-${ICONS_NAME[iconName]}`}
        href=''
      >
        {text}
      </Link>
    </li>
  )
}

function MobileMenu() {
  return (
    <aside className='mobile-menu fixed bottom-0 left-0 z-40 pb-[30px] w-full bg-base-100 rounded-t-[16px] text-[11px] text-base-600/[.5] border-t border-t-[#000]/[.12]'>
      <nav>
        <ul className='flex justify-between items-end'>
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
