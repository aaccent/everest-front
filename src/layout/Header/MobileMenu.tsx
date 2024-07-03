import React from 'react'
import Link from 'next/link'
import { IconName, ICONS_NAME } from '@/globals/icons/icons'
import CatalogIcon from '@/ui/CatalogIcon'

interface MenuButtonProps {
  iconName: IconName
  text: string
}

function MenuButton({ iconName, text }: MenuButtonProps) {
  return (
    <Link
      className={`w-full flex flex-col justify-center gap-[2px] items-center before:size-[28px] before:bg-no-repeat before:bg-center before:bg-contain before:filter-base-600 before:opacity-45 before:bg-${ICONS_NAME[iconName]}`}
      href=''
    >
      {text}
    </Link>
  )
}

function MobileMenu() {
  return (
    <aside className='fixed bottom-0 left-0 pb-[30px] w-full flex justify-between items-end bg-base-100 rounded-t-[16px] text-[11px] text-base-600/[.5] border-t border-t-[#000]/[.12]'>
      <MenuButton iconName='PROFILE' text='Профиль' />
      <MenuButton iconName='SCALE' text='Сравнение' />
      <button className='w-full flex flex-col items-center gap-[4px]' type='button'>
        <span className='mt-[-20px] circle-[56px] flex justify-center items-center bg-primary'>
          <CatalogIcon />
        </span>
        Каталог
      </button>
      <MenuButton iconName='HEART' text='Избранное' />
      <MenuButton iconName='SEARCH' text='Поиск' />
    </aside>
  )
}

export default MobileMenu
