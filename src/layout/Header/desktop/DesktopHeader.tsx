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
          className='text-base-300-lg-100 block rounded-[12px] px-[12px] py-[10px] normal-case transition-colors hover:bg-base-300'
          href={item.href}
        >
          {item.title}
        </Link>
      </li>
    ))
  }

  return (
    <ul className='invisible absolute top-[calc(100%+16.5px)] z-30 w-max min-w-[210px] rounded-[24px] bg-base-100 p-[14px] text-base-600 opacity-0 transition-visibility duration-300 group-hover:visible group-hover:opacity-100 group-hover:transition-opacity'>
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
      className={`px-container absolute top-0 z-20 w-full pt-[14px] text-base-100 peer-[:is(.is-black,.catalog-menu)]/style-state:text-base-600 ${className}`}
    >
      <div className='flex items-center justify-between border-b border-b-base-100/15 pb-[13px] peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:border-b-base-600/10'>
        <nav>
          <ul className='text-base-500-reg-200 flex items-center gap-[14px] opacity-50 peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:text-base-650 peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:opacity-100'>
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
        <div className='flex items-center gap-[24px] peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:text-primary'>
          <button className='text-base-500-reg-100-upper flex items-center gap-[4px] before:size-[17px] before:bg-icon-location before:filter-base-100 before:bg-default peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:before:filter-primary'>
            Абакан
          </button>
          <button className='text-base-500-reg-100-upper flex items-center gap-[4px] before:size-[17px] before:bg-icon-add before:filter-base-100 before:bg-default peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:before:filter-primary'>
            добавить объявление
          </button>
          <button className='text-base-500-reg-100-upper flex items-center gap-[4px] before:size-[17px] before:bg-icon-phone before:filter-base-100 before:bg-default peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:before:filter-primary'>
            заказать звонок
          </button>
        </div>
      </div>
      <div className='flex justify-between border-b border-b-base-100/15 peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:border-b-base-600/10'>
        <div className='flex w-full items-center justify-between border-r border-r-base-100/15 py-[15px] pr-[43px] peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:border-r-base-600/10'>
          <Link href={'/'}>
            <Image
              className='h-[33px] w-[160px] object-contain object-left peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:filter-primary'
              src={Logo}
              alt='Логотип АН Эверест'
            />
          </Link>
          <ul className='text-base-500-reg-100-upper ml-[20px] flex items-center gap-[27px]'>
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
              <span className='relative right-[-8px] top-[2px] flex h-[4px] w-[4px]'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75'></span>
                <span className='relative inline-flex h-[4px] w-[4px] rounded-full bg-primary'></span>
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
        <div className='flex w-full max-w-[575px] items-center justify-between gap-[15px] py-[15px] pl-[49px]'>
          <div className='flex flex-col gap-[2px]'>
            <a className='text-base-200-med-100' href='tel:8 (843) 207-39-50'>
              8 (843) 207-39-50
            </a>
            <div className='text-base-500-reg-200 opacity-50'>Ежедневно с 09:00 до 19:00</div>
          </div>
          <div className='flex items-center gap-[10px]'>
            <button className='flex size-[42px] items-center justify-center rounded-full bg-base-100/15 before:block before:size-[20px] before:bg-icon-search before:filter-base-100 before:bg-default peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:bg-base-300 peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:before:filter-base-600' />
            <button className='flex size-[42px] items-center justify-center rounded-full bg-base-100/15 before:block before:size-[20px] before:bg-icon-heart before:filter-base-100 before:bg-default peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:bg-base-300 peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:before:filter-base-600' />
            <button className='flex size-[42px] items-center justify-center rounded-full bg-base-100/15 before:block before:size-[20px] before:bg-icon-scale before:filter-base-100 before:bg-default peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:bg-base-300 peer-any-parent-[:is(.is-black,.catalog-menu)]/style-state:before:filter-base-600' />
          </div>
          <Button className='h-[42px] min-w-[110px]' size='small' type='transparent'>
            Войти
          </Button>
        </div>
      </div>
    </header>
  )
}

export default DesktopHeader
