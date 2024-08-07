import React from 'react'
import Section from '@/layout/Section'
import { ComplexInDetailed } from '@/types/Complex'
import Img from '@/ui/Img'
import Image from 'next/image'
import DeveloperLogo from '@/assets/static/donstroy.svg'
import { formatPriceShortBy } from '@/features/price'
import Button from '@/ui/buttons/Button'
import DecorativeBgMobile from '@/assets/static/decorative-bg/decorative-bg-mobile.svg'
import DecorativeSmallBg from '@/assets/static/decorative-bg/decorative-bg-small.svg'
import NoPhoto from '@/assets/static/no-photo.jpg'

type Props = Omit<ComplexInDetailed, 'seoUrl'>

function MainHero({ name, address, mainImg, description, minArea, maxArea, minPrice, developerLogo }: Props) {
  return (
    <Section
      className=''
      containerClassName='relative flex flex-col bg-base-200 pb-[20px] rounded-[20px] md:flex-row md:bg-transparent md:gap-[16px] md:pb-0'
    >
      <Image src={DecorativeBgMobile} alt='' className='absolute left-0 md:hidden' />

      <div className='mt-[33px] bg-transparent md:order-2 md:mt-0 md:w-[644px] md:rounded-[20px] md:bg-base-200'>
        <Image src={DecorativeSmallBg} alt='' className='hidden md:block' />
        <div className='md:flex md:h-[93.5%] md:flex-col md:px-[40px] md:pb-[40px]'>
          <h1 className='text-header-100 mb-[16px] text-base-600'>{name}</h1>
          <div className='mb-[32px] flex items-center gap-[10px] md:gap-0'>
            <div className='flex size-[34px] items-center justify-center rounded-full border border-base-400 after:block after:size-[14px] after:bg-icon-address after:filter-base-600 after:bg-default-contain md:border-none md:after:filter-primary'></div>
            <div className='text-base-300-lg-100 text-base-650 md:text-primary'>{address || 'нет адреса'}</div>
          </div>
          <div className='text-base-200-lg-100 mt-[56px] hidden w-full max-w-[464px] text-base-650 md:mb-[20px] md:block'>
            {description}
          </div>

          <div className='hidden items-center gap-[24px] md:mt-auto md:flex'>
            <Button variation='primary' size='medium' text='подобрать квартиру' className='w-full md:min-w-[175px]' />
            <Button
              className='mt-[8px] w-full md:mt-0 md:flex md:gap-[6px] md:bg-transparent md:before:block md:before:size-[16px] md:before:bg-icon-calculator md:before:bg-default-contain md:hover:bg-transparent md:hover:text-base-600'
              variation='third'
              size='medium'
              text='Рассчитать ипотеку'
            />
          </div>
        </div>
      </div>

      <div className='relative mb-[32px] overflow-hidden md:order-1 md:m-0'>
        <Img
          src={NoPhoto}
          className='h-[344px] rounded-[20px] object-cover object-center md:h-full md:w-[908px]'
          width={310}
          height={344}
        />
        <Image
          src={DeveloperLogo}
          width={85}
          height={24}
          alt=''
          className='absolute left-[20px] top-[24px] h-full max-h-[30px] max-w-fit filter-base-100 md:max-h-[40px]'
        />
        <div className='absolute bottom-[20px] w-[310px] overflow-auto scrollbar-transparent md:w-full'>
          <div className='mx-[20px] flex w-fit items-center gap-[10px] text-base-100'>
            <div className='min-w-[184px] rounded-[20px] bg-base-600 px-[18px] py-[14px]'>
              <div className='text-header-300 mb-[12px]'>
                {`${minArea || '0'} — ${maxArea || '0'}`} м<sup>2</sup>
              </div>
              <div className='text-base-400-reg-100 min-w-[128px] uppercase opacity-50'>площадь квартир</div>
            </div>
            <div className='min-w-[184px] rounded-[20px] bg-base-600 px-[18px] py-[14px]'>
              <div className='text-header-300 mb-[12px]'>{formatPriceShortBy(minPrice)}</div>
              <div className='text-base-400-reg-100 min-w-[128px] uppercase opacity-50'>стоимость квартир</div>
            </div>
          </div>
        </div>
      </div>

      <div className='items-center gap-[24px] md:hidden'>
        <Button variation='primary' size='medium' text='подобрать квартиру' className='w-full md:min-w-[175px]' />
        <Button
          className='mt-[8px] w-full md:mt-0 md:flex md:gap-[6px] md:bg-transparent md:before:block md:before:size-[16px] md:before:bg-icon-calculator md:before:bg-default-contain md:hover:bg-transparent md:hover:text-base-600'
          variation='third'
          size='medium'
          text='Рассчитать ипотеку'
        />
      </div>
    </Section>
  )
}

export default MainHero
