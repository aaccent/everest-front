import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Logo from '@/assets/static/logo.svg'
import CatalogButton from '@/layout/Header/components/CatalogButton'
import { aboutMenu, MenuItem, newBuildingsMenu } from '@/layout/Header/menus'
import Button from '@/ui/buttons/Button'

interface SubmenuProps {
  list: MenuItem[]
}

function Submenu({ list }: SubmenuProps) {
  function showList() {
    return list.map((item, i) => (
      <li key={i}>
        <Link
          className='px-[12px] py-[10px] rounded-[12px] block transition-colors normal-case text-base-300-lg-100 hover:bg-base-300'
          href={item.href}
        >
          {item.title}
        </Link>
      </li>
    ))
  }

  return (
    <ul className='absolute top-[calc(100%+16.5px)] z-30 min-w-[210px] w-max p-[14px] bg-base-100 rounded-[24px] invisible opacity-0 text-base-600 transition-visibility duration-300 group-hover:visible group-hover:opacity-100 group-hover:transition-opacity'>
      {showList()}
    </ul>
  )
}

interface Props {
  className: string
}

function DesktopHeader({ className }: Props) {
  return (
    <header
      className={`absolute top-0 z-20 pt-[14px] px-container w-full text-base-100 peer-any-parent-[.is-black]/style-state:text-base-600 ${className}`}
    >
      <div className='flex justify-between items-center border-b border-b-base-100/15 pb-[13px] peer-any-parent-[.is-black]/style-state:border-b-base-600/10'>
        <nav>
          <ul className='flex items-center gap-[14px] opacity-50 text-base-500-reg-200 peer-any-parent-[.is-black]/style-state:text-base-650 peer-any-parent-[.is-black]/style-state:opacity-100'>
            <li>
              <button>Сервисы</button>
            </li>
            <li>
              <Link href={'#'}>Отзывы</Link>
            </li>
            <li>
              <Link href={'#'}>Trade-in</Link>
            </li>
          </ul>
        </nav>
        <div className='flex gap-[24px] items-center peer-any-parent-[.is-black]/style-state:text-primary'>
          <button className='flex items-center gap-[4px] text-base-500-reg-100-upper before:size-[17px] before:bg-icon-location before:bg-default before:filter-base-100 peer-any-parent-[.is-black]/style-state:before:filter-primary'>
            Абакан
          </button>
          <button className='flex items-center gap-[4px] text-base-500-reg-100-upper before:size-[17px] before:bg-icon-add before:bg-default before:filter-base-100 peer-any-parent-[.is-black]/style-state:before:filter-primary'>
            добавить объявление
          </button>
          <button className='flex items-center gap-[4px] text-base-500-reg-100-upper before:size-[17px] before:bg-icon-phone before:bg-default before:filter-base-100 peer-any-parent-[.is-black]/style-state:before:filter-primary'>
            заказать звонок
          </button>
        </div>
      </div>
      <div className='flex justify-between border-b border-b-base-100/15 peer-any-parent-[.is-black]/style-state:border-b-base-600/10'>
        <div className='pr-[43px] w-full border-r border-r-base-100/15 flex justify-between items-center py-[15px] peer-any-parent-[.is-black]/style-state:border-r-base-600/10'>
          <Link href={'/'}>
            <Image
              className='w-[160px] h-[33px] object-left object-contain peer-any-parent-[.is-black]/style-state:filter-primary'
              src={Logo}
              alt='Логотип АН Эверест'
            />
          </Link>
          <ul className='ml-[20px] flex items-center gap-[27px] text-base-500-reg-100-upper'>
            <li>
              <CatalogButton />
            </li>
            <li>
              <Link href={'#'}>Покупка</Link>
            </li>
            <li>
              <Link href={'#'}>Аренда</Link>
            </li>
            <li className='group relative'>
              <button className='uppercase'>Новостройки</button>
              <Submenu list={newBuildingsMenu} />
            </li>
            <li className='flex'>
              <Link href={'#'}>Ипотека</Link>
              <span className='relative flex h-[4px] w-[4px] top-[2px] right-[-8px]'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75'></span>
                <span className='relative inline-flex rounded-full h-[4px] w-[4px] bg-primary'></span>
              </span>
            </li>
            <li className='group relative'>
              <button className='uppercase'>О нас</button>
              <Submenu list={aboutMenu} />
            </li>
            <li>
              <Link href={'#'}>Контакты</Link>
            </li>
          </ul>
        </div>
        <div className='pl-[49px] py-[15px] max-w-[575px] w-full flex items-center justify-between gap-[15px]'>
          <div className='flex flex-col gap-[2px]'>
            <a className='text-base-200-med-100' href='tel:8 (843) 207-39-50'>
              8 (843) 207-39-50
            </a>
            <div className='text-base-500-reg-200 opacity-50'>Ежедневно с 09:00 до 19:00</div>
          </div>
          <div className='flex items-center gap-[10px]'>
            <button className='size-[42px] flex justify-center items-center rounded-full bg-base-100/15 before:bg-icon-search before:bg-default before:block before:filter-base-100 before:size-[20px] peer-any-parent-[.is-black]/style-state:bg-base-300 peer-any-parent-[.is-black]/style-state:before:filter-base-600' />
            <button className='size-[42px] flex justify-center items-center rounded-full bg-base-100/15 before:bg-icon-heart before:bg-default before:block before:filter-base-100 before:size-[20px] peer-any-parent-[.is-black]/style-state:bg-base-300 peer-any-parent-[.is-black]/style-state:before:filter-base-600' />
            <button className='size-[42px] flex justify-center items-center rounded-full bg-base-100/15 before:bg-icon-scale before:bg-default before:block before:filter-base-100 before:size-[20px] peer-any-parent-[.is-black]/style-state:bg-base-300 peer-any-parent-[.is-black]/style-state:before:filter-base-600' />
          </div>
          <Button className='min-w-[110px] h-[42px]' size='small' type='transparent'>
            Войти
          </Button>
        </div>
      </div>
    </header>
  )
}

export default DesktopHeader
