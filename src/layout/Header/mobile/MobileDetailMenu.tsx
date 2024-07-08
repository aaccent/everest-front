import React from 'react'
import Link from 'next/link'

import MobileMenuItem from './MobileMenuItem'
import MobileDetailMenuWrapper from './MobileDetailMenuWrapper'
import MenuItemCard from '@/layout/Header/components/MenuItemCard'
import SeeAllCard from '@/layout/Header/components/SeeAllCard'

import { IconName, ICONS_NAME } from '@/globals/icons/icons'
import { getCatalog, getServices } from '@/globals/api'
import { aboutMenu, MenuItem, newBuildingsMenu } from '@/layout/Header/menus'

function showItemsCards(list: any[]) {
  return list.map((item, i) => (
    <li key={i}>
      <MenuItemCard {...item} />
    </li>
  ))
}

function showItems(list: MenuItem[]) {
  return list.map((item, i) => (
    <li key={i}>
      <Link className='text-base-100-reg-100 block border-b border-b-base-600/10 py-[18px]' href={item.href || '#'}>
        {item.title}
      </Link>
    </li>
  ))
}

interface ActionButtonProps {
  text: string
  href?: string
  icon: IconName
  accented?: boolean
}

function ActionButton({ accented, text, href, icon }: ActionButtonProps) {
  const inner = (
    <div
      className={`flex h-[115px] flex-col justify-between gap-[10px] rounded-[20px] p-[16px] ${accented ? 'bg-primary text-base-100' : 'bg-base-300'}`}
    >
      <span className='text-base-300-reg-200 block max-w-[93px] text-left'>{text}</span>
      <span
        className={`flex items-center justify-center self-end bg-base-100 circle-[40px] after:size-[21px] ${accented ? 'after:filter-primary' : 'after:filter-base-600'} after:bg-default after:bg-${ICONS_NAME[icon]}`}
      />
    </div>
  )

  return href ? <Link href={href}>{inner}</Link> : <button type='button'>{inner}</button>
}

async function MobileDetailMenu() {
  const catalog = await getCatalog()
  const services = await getServices()

  return (
    <MobileDetailMenuWrapper className='invisible fixed bottom-0 z-20 h-full w-full bg-base-100 opacity-0 transition-opacity peer-[.menu-open]/style-state:visible peer-[.menu-open]/style-state:opacity-100'>
      <div className='absolute inset-x-[20px] top-[24px] h-[1px] bg-base-600/10' />
      <div className='px-container relative h-full overflow-y-auto py-[24px]'>
        <nav className='mb-[32px]'>
          <ul>
            <MobileMenuItem text='Покупка'>
              <SeeAllCard />
              {showItemsCards(catalog)}
            </MobileMenuItem>
            <MobileMenuItem text='Аренда'>
              <SeeAllCard />
              {showItemsCards(catalog)}
            </MobileMenuItem>
            <MobileMenuItem text='Новостройки'>{showItems(newBuildingsMenu)}</MobileMenuItem>
            <MobileMenuItem href='#' text='Ипотека' />
            <MobileMenuItem text='Сервисы'>{showItems(services as any[])}</MobileMenuItem>
            <MobileMenuItem text='О нас'>{showItems(aboutMenu)}</MobileMenuItem>
            <MobileMenuItem href='#' text='Контакты' />
          </ul>
        </nav>
        <div className='grid grid-cols-2 gap-[8px]'>
          <ActionButton text='Заказать звонок' icon='PHONE' accented />
          <ActionButton text='Добавить объявление' icon='ADD' href='#' />
          <ActionButton text='г.Абакан' icon='LOCATION' />
          <ActionButton text='Подобрать квартиру' icon='KEYS' />
        </div>
      </div>
    </MobileDetailMenuWrapper>
  )
}

export default MobileDetailMenu