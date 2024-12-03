import React from 'react'
import Link from 'next/link'

import MobileMenuItem from './MobileMenuItem'
import MobileDetailMenuWrapper from './MobileDetailMenuWrapper'
import { getServices } from '@/globals/api'
import { MenuItem, newBuildingsMenu } from '@/layout/Header/menus'
import MobileSaleRentMenu from '@/layout/Header/SaleRentMenu/MobileSaleRentMenu'
import { MobileCallPopupButton, MobileCityButton } from '@/layout/Header/mobile/ActionButton'
import { getCityByIpFromLocation } from '@/components/GeoPosition'
import { ROUTES } from '@/globals/paths'

function showItems(list: MenuItem[]) {
  return list.map((item, i) => (
    <li key={i}>
      <Link className='text-base-100-reg-100 block border-b border-b-base-600/10 py-[18px]' href={item.href || '#'}>
        {item.title}
      </Link>
    </li>
  ))
}

async function MobileDetailMenu() {
  const services = await getServices()
  const cityFromIp = await getCityByIpFromLocation()

  return (
    <MobileDetailMenuWrapper className='invisible fixed bottom-0 z-40 h-full w-full bg-base-100 opacity-0 transition-opacity peer-[[data-menu="mobile"]]/header-state:visible peer-[[data-menu="mobile"]]/header-state:opacity-100'>
      <div className='px-container relative h-full overflow-y-auto py-[24px] has-[.active-submenu]:overflow-hidden'>
        <nav className='mb-[32px]'>
          <ul>
            <MobileMenuItem text='Покупка'>
              <MobileSaleRentMenu menuType='sale' />
            </MobileMenuItem>
            <MobileMenuItem text='Аренда'>
              <MobileSaleRentMenu menuType='rent' />
            </MobileMenuItem>
            <MobileMenuItem text='Новостройки'>{showItems(newBuildingsMenu)}</MobileMenuItem>
            <MobileMenuItem href={ROUTES.CONTACTS} text='Контакты' />
          </ul>
        </nav>
        <div className='grid grid-cols-2 gap-[8px]'>
          <MobileCallPopupButton />
          <MobileCityButton autoSelectedCity={cityFromIp} />
        </div>
      </div>
    </MobileDetailMenuWrapper>
  )
}

export default MobileDetailMenu
