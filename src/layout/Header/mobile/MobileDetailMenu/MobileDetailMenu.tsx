import React from 'react'
import MobileDetailMenuWrapper from './MobileDetailMenuWrapper'
import { getCatalog, getServices } from '@/globals/api'
import MobileMenuItem from './components/MobileMenuItem'
import MenuItemCard from '../../components/MenuItemCard'
import SeeAllCard from '../../components/SeeAllCard'
import Link from 'next/link'

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

async function MobileDetailMenu() {
  const catalog = await getCatalog()
  const services = await getServices()

  return (
    <MobileDetailMenuWrapper className='fixed bottom-0 z-20 w-full h-full bg-base-100 opacity-0 invisible transition-opacity overflow-y-auto peer-[.menu-open]/style-state:visible peer-[.menu-open]/style-state:opacity-100'>
      <div className='absolute inset-x-[20px] top-[24px] h-[1px] bg-base-600/[.1]' />
      <div className='relative pt-[24px] h-full'>
        <ul className='px-[20px]'>
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
      </div>
    </MobileDetailMenuWrapper>
  )
}

export default MobileDetailMenu
