import React from 'react'
import Link from 'next/link'

import MobileMenuItem from './MobileMenuItem'
import MobileDetailMenuWrapper from './MobileDetailMenuWrapper'
import MenuItemCard from '@/layout/Header/components/MenuItemCard'
import SeeAllCard from '@/layout/Header/components/SeeAllCard'

import { IconName, ICONS_NAME } from '@/globals/icons/icons'
import { getCatalog, getServices } from '@/globals/api'

function showItemsCards(list: any[]) {
  return list.map((item, i) => (
    <li key={i}>
      <MenuItemCard {...item} />
    </li>
  ))
}

function showItems(list: any[]) {
  return list.map((item, i) => (
    <li key={i}>
      <Link className='py-[18px] block text-base-100-reg-100 border-b border-b-base-600/[.1]' href='#'>
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
      className={`p-[16px] h-[115px] flex flex-col justify-between gap-[10px] rounded-[20px] ${accented ? 'bg-primary text-base-100' : 'bg-base-300'}`}
    >
      <span className='max-w-[93px] block text-base-300-reg-200 text-left'>{text}</span>
      <span
        className={`circle-[40px] flex justify-center items-center bg-base-100 self-end after:size-[21px] ${accented ? 'after:filter-primary' : 'after:filter-base-600'} after:bg-default after:bg-${ICONS_NAME[icon]}`}
      />
    </div>
  )

  return href ? <Link href={href}>{inner}</Link> : <button type='button'>{inner}</button>
}

async function MobileDetailMenu() {
  const catalog = await getCatalog()
  const services = await getServices()

  return (
    <MobileDetailMenuWrapper className='fixed bottom-0 z-20 w-full h-full bg-base-100 opacity-0 invisible transition-opacity peer-[.menu-open]/style-state:visible peer-[.menu-open]/style-state:opacity-100'>
      <div className='absolute inset-x-[20px] top-[24px] h-[1px] bg-base-600/[.1]' />
      <div className='relative px-[20px] py-[24px] h-full overflow-y-auto'>
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
            <MobileMenuItem text='Новостройки'>
              <SeeAllCard />
              {showItemsCards(catalog)}
            </MobileMenuItem>
            <MobileMenuItem href='#' text='Ипотека' />
            <MobileMenuItem text='Сервисы'>{showItems(services)}</MobileMenuItem>
            <MobileMenuItem href='' text='О нас' />
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
