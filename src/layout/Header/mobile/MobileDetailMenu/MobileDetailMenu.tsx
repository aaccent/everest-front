import React from 'react'
import MobileDetailMenuWrapper from './MobileDetailMenuWrapper'
import { getCatalog, getServices } from '@/globals/api'
import MobileMenuItem from './components/MobileMenuItem'
import MenuItemCard from '../../components/MenuItemCard'
import SeeAllCard from '../../components/SeeAllCard'

function showItems(list: any[]) {
  return list.map((item, i) => (
    <li key={i}>
      <MenuItemCard {...item} />
    </li>
  ))
}

async function MobileDetailMenu() {
  const catalog = await getCatalog()
  const services = await getServices()

  return (
    <MobileDetailMenuWrapper className='fixed bottom-0 z-20 w-full h-full bg-base-100 opacity-0 invisible transition-[visibility,opacity] peer-[.menu-open]/style-state:visible peer-[.menu-open]/style-state:opacity-100'>
      <div className='absolute inset-x-[20px] top-[24px] h-[1px] bg-base-600/[.1]' />
      <div className='relative pt-[24px] h-full'>
        <ul className='px-[20px]'>
          <MobileMenuItem text='Покупка'>
            <SeeAllCard />
            {showItems(catalog)}
          </MobileMenuItem>
          <MobileMenuItem text='Аренда'>
            <SeeAllCard />
            {showItems(catalog)}
          </MobileMenuItem>
          <MobileMenuItem text='Новостройки'>
            <SeeAllCard />
            {showItems(catalog)}
          </MobileMenuItem>
          <MobileMenuItem href='#' text='Ипотека' />
          <MobileMenuItem text='Сервисы'>
            <li></li>
          </MobileMenuItem>
          <MobileMenuItem text='О нас'>
            <li></li>
          </MobileMenuItem>
          <MobileMenuItem href='#' text='Контакты' />
        </ul>
      </div>
    </MobileDetailMenuWrapper>
  )
}

export default MobileDetailMenu
