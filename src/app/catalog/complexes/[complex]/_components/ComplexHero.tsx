import React from 'react'
import Section from '@/layout/Section'
import { DetailComplex } from '@/types/catalog/Complex'
import Img from '@/ui/Img'
import { formatPriceShort } from '@/features/utility/price'
import Button from '@/ui/buttons/Button'
import { DecorativeBlock } from '@/layout/DecorativeSection'
import { TEST_ID } from '@/globals/testIds'
import { LAYOUT_ID } from '@/app/catalog/complexes/[complex]/_components/LayoutChoice/LayoutChoice'

interface Props {
  complex: DetailComplex
}

function ComplexHero({ complex }: Props) {
  return (
    <Section
      className='relative m-auto !mt-0 flex w-[90%] flex-col rounded-[20px] bg-base-200 pb-[20px] md:w-full md:flex-row md:gap-[16px] md:bg-transparent md:pb-0'
      hideContainer
    >
      <DecorativeBlock type='medium' className='px-container md:order-2 md:px-0'>
        <div className='mt-[33px] bg-transparent md:mt-0 md:h-full md:w-[644px] md:rounded-[20px] md:bg-base-200'>
          <div className='md:flex md:h-full md:flex-col md:px-[40px] md:pb-[40px] md:pt-[68px]'>
            <h1 className='text-header-100 mb-[16px] text-base-600' data-testid={TEST_ID.COMPLEX_DETAIL_H1}>
              {complex.name}
            </h1>
            {!!complex.address && (
              <div className='mb-[32px] flex items-center gap-[10px] md:mb-[56px] md:gap-0'>
                <div className='flex size-[34px] items-center justify-center rounded-full border border-base-400 after:block after:size-[14px] after:bg-icon-address after:filter-base-600 after:bg-default-contain md:border-none md:after:filter-primary'></div>
                <div className='text-base-300-lg-100 text-base-650 md:text-primary'>{complex.address}</div>
              </div>
            )}
            <div className='text-base-200-lg-100 hidden w-full max-w-[464px] text-base-650 md:mb-[20px] md:block'>
              {complex.description}
            </div>

            <div className='hidden items-center gap-[24px] md:mt-auto md:flex'>
              <Button
                href={`#${LAYOUT_ID}`}
                variation='primary'
                size='medium'
                text='подобрать квартиру'
                className='w-fit shrink-0 px-[16px]'
              />
            </div>
          </div>
        </div>
      </DecorativeBlock>
      <div className='px-container relative mb-[32px] overflow-hidden md:order-1 md:m-0 md:px-0'>
        <DecorativeBlock
          type='medium'
          decorativeClassName='filter-base-650 md:filter-base-100 md:-scale-x-100'
          className='md:h-full'
        >
          <Img
            src={complex.mainImg}
            className='h-[344px] w-full rounded-[20px] object-cover object-center md:h-[576px] md:w-[908px]'
            width={310}
            height={576}
          />
          <Img
            className='absolute left-[20px] top-[24px] h-full max-h-[30px] max-w-fit filter-base-100 md:top-[58px] md:max-h-[40px]'
            src={complex.developerLogo}
            width={85}
            height={24}
            alt=''
            removeIfFail
          />
          <div className='absolute bottom-[20px] w-[310px] overflow-auto scrollbar-transparent md:w-full'>
            <div className='mx-[20px] flex w-fit items-center gap-[10px] text-base-100'>
              <div className='min-w-[184px] rounded-[20px] bg-base-600 px-[18px] py-[14px]'>
                <div className='text-header-300 mb-[12px]'>
                  23.41 — 75.67 м<sup>2</sup>
                </div>
                <div className='text-base-400-reg-100 min-w-[128px] uppercase opacity-50'>площадь квартир</div>
              </div>
              <div className='min-w-[184px] rounded-[20px] bg-base-600 px-[18px] py-[14px]'>
                <div className='text-header-300 mb-[12px]'>от {formatPriceShort(complex.minPrice)}</div>
                <div className='text-base-400-reg-100 min-w-[128px] uppercase opacity-50'>стоимость квартир</div>
              </div>
            </div>
          </div>
        </DecorativeBlock>
      </div>

      <div className='px-container items-center gap-[24px] md:hidden md:px-0'>
        <Button href={`#${LAYOUT_ID}`} variation='primary' size='medium' text='подобрать квартиру' className='w-full' />
      </div>
    </Section>
  )
}

export default ComplexHero
