import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import CatalogButton from '@/layout/Header/components/CatalogButton'
import { aboutMenu, MenuItem, newBuildingsMenu } from '@/layout/Header/menus'

import Logo from '@/assets/static/logo.svg'
import SaleRentButton from '@/layout/Header/components/SaleRentButton'
import HeaderTop from '@/layout/Header/desktop/HeaderTop'

interface CircleButtonProps {
  className?: string
}

function CircleButton({ className }: CircleButtonProps) {
  return (
    <button
      className={`flex size-[42px] items-center justify-center rounded-full bg-base-100/15 before:block before:size-[20px] before:filter-base-100 before:bg-default peer-any-parent-[.is-black]/header-state:bg-base-300 peer-any-parent-[.is-black]/header-state:before:filter-base-600 ${className}`}
    />
  )
}

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

function DesktopHeader() {
  return (
    <>
      <HeaderTop className='px-container flex pt-[14px] peer-[[data-main-page]]/header-state:hidden peer-[[data-menu]]/header-state:hidden peer-[.is-black]/header-state:border-b-base-600/10' />
      <header className='px-container sticky top-0 z-50 w-full text-base-100 peer-[[data-main-page]]/header-state:fixed peer-[.is-fixed]/header-state:border-b peer-[.is-fixed]/header-state:border-b-base-400 peer-[:is(.is-fixed,.is-black)]/header-state:bg-base-100 peer-[.is-fixed]/header-state:pt-0 peer-[:is([data-menu],[data-main-page])]/header-state:pt-[14px] peer-[.is-black]/header-state:text-base-600'>
        <HeaderTop className='hidden peer-any-parent-[[data-main-page]]/header-state:flex peer-any-parent-[[data-menu]]/header-state:flex peer-any-parent-[.is-black]/header-state:border-b-base-600/10' />
        <div className='flex justify-between border-b border-b-base-100/15 peer-any-parent-[.is-fixed]/header-state:border-b-0 peer-any-parent-[.is-black]/header-state:border-b-base-600/10'>
          <div className='flex w-full items-center justify-between border-r border-r-base-100/15 py-[15px] pr-[43px] peer-any-parent-[.is-black]/header-state:border-r-base-600/10'>
            <Link href='/'>
              <Image
                className='h-[33px] w-[160px] object-contain object-left peer-any-parent-[.is-black]/header-state:filter-primary'
                src={Logo}
                alt='Логотип АН Эверест'
              />
            </Link>
            <ul className='text-base-500-reg-100-upper ml-[20px] flex items-center gap-[27px]'>
              <li>
                <CatalogButton />
              </li>
              <li>
                <SaleRentButton type='sale' />
              </li>
              <li>
                <SaleRentButton type='rent' />
              </li>
              <li className='group relative'>
                <button className='uppercase'>Новостройки</button>
                <Submenu list={newBuildingsMenu} />
              </li>
              <li className='flex'>
                <Link href='#'>Ипотека</Link>
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
                <Link href='/contacts'>Контакты</Link>
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
              <CircleButton className='before:bg-icon-search' />
              <CircleButton className='before:bg-icon-heart' />
              <CircleButton className='before:bg-icon-scale' />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default DesktopHeader
