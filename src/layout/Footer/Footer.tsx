import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Section from '@/layout/Section'
import UpButton from '@/layout/Footer/UpButton'
import FooterMenu from '@/layout/Footer/FooterMenu'

import { getSocials } from '@/globals/api/methods/getSocials'
import { getCatalog } from '@/globals/api/methods/getCatalog'
import { getServices } from '@/globals/api/methods/getServices'

import logo from '@/assets/static/logo.svg'
import aaccentLogo from '@/assets/static/aaccent-logo.svg'

interface socialItem {
  name: string
  icon: string
  url: string
}

async function Footer() {
  const socials: socialItem[] = await getSocials()
  const staticMenu = ['Об агенстве', 'Риелторы', 'Обучение', 'Отзывы', 'Вакансии', 'Блог', 'Контакты']
  const catalog = await getCatalog()
  const services = await getServices()

  function showStaticMenu() {
    return (
      <ul className='mt-[24px] pb-[24px] flex flex-col gap-[12px] border-b border-b-base-100/10 md:border-none md:mt-0 md:mr-[127px] md:gap-[14px]'>
        {staticMenu.map((item, index) => (
          <Link href={'#'} key={index}>
            <li className='text-base-100 text-base-100-reg-100'>{item}</li>
          </Link>
        ))}
      </ul>
    )
  }

  function showMobileSocials() {
    return (
      <div className='grid grid-cols-2 gap-[8px] md:hidden'>
        {socials.map((social, index) => (
          <Link
            className='flex justify-center items-center size-[32px] bg-base-115 rounded-full'
            href={social.url}
            key={index}
          >
            <Image src={social.icon} width={18} height={18} alt={''} className='' />
          </Link>
        ))}
      </div>
    )
  }

  function showDesktopSocials() {
    return (
      <div className='hidden md:block'>
        <div className='mb-[15px] text-base-100-reg-100 text-base-150'>Соц.сети</div>
        <ul className='flex flex-col gap-[10px]'>
          {socials.map((social, index) => (
            <Link className='flex gap-[10px] items-center' href={social.url} key={index}>
              <div className='flex justify-center items-center size-[32px] rounded-full bg-base-115'>
                <Image src={social.icon} alt={''} width={18} height={18} />
              </div>
              <div className='text-base-300-lg-100 text-base-100'>{social.name}</div>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <Section containerClassName={'py-[32px] footer'} className='bg-base-600 rounded-t-[20px] md:rounded-t-[32px]'>
      <div className='flex flex-col md:pt-[61px] md:flex-row md:pb-[65px] md:border-b md:border-b-base-100/10'>
        <div className='flex justify-between items-end pb-[23px] border-b border-b-base-100/10 md:items-start md:border-none'>
          <div className='max-w-[206px] w-full md:mr-[153px] md:max-w-[243px]'>
            <Image src={logo} alt={''} width={198} height={42} />
            <div className='mt-[16px] mb-[31px] text-base-400-lg-100 text-base-150 md:mt-[20px] md:mb-[73px]'>
              Индивидуальный подбор объектов для вашего комфорта
            </div>
            <div className='mb-[2px] text-base-100-reg-100 text-base-100 pb-[4px]'>
              <Link href={'tel:8 (843) 207-39-50'}>8 (843) 207-39-50</Link>
            </div>
            <div className='mb-[12px] text-base-400-lg-100 text-base-150 md:mb-[16px]'>Ежедневно с 09:00 до 19:00</div>
            <div className='flex gap-[6px] items-center text-base-100 text-base-200-lg-100 before:bg-icon-email before:bg-no-repeat before:bg-center before:size-[22px]'>
              <Link href={'mailto:mail@everest.ru'} />
              mail@everest.ru
            </div>
          </div>
          {showMobileSocials()}
        </div>
        {showStaticMenu()}
        <FooterMenu list={catalog} title={'Каталог объектов'} className={'md:mr-[122px]'} />
        <FooterMenu list={services} title={'Услуги'} className={'md:mr-[84px]'} />
        {showDesktopSocials()}
      </div>
      <div className='mt-[23px] md:flex md:items-center'>
        <UpButton />
        <Image src={aaccentLogo} alt={''} width={138} height={38} className='md:order-3' />
        <div className='mt-[24px] flex flex-col gap-[12px] text-base-150 text-base-500-reg-200 md:mt-0 md:order-2 md:flex-row'>
          <p className='md:mr-[118px]'>© 2023, ООО «Эверест»</p>
          <Link href={'#'} className='md:mr-[139px]'>
            Защита персональных данных
          </Link>
          <Link href={'#'} className='md:mr-[187px]'>
            Правовая информация
          </Link>
        </div>
      </div>
    </Section>
  )
}

export default Footer
