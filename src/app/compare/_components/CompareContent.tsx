'use client'
import React, { useContext } from 'react'
import Selector from '@/ui/inputs/Selector'
import { AdaptiveContext } from '@/features/adaptive'
import TabButtons, { TabButtonItem } from '@/components/TabButtons'
import Carousel, { CarouselInner, CarouselSlide } from '@/components/Carousel/Carousel'
import Img from '@/ui/Img'
import Radio from '@/ui/inputs/Radio'
import {
  CarouselNavigationButtonNext,
  CarouselNavigationButtonPrev,
} from '@/components/Carousel/components/CarouselNavigationButtons'

const testList = ['Apartments', 'Rooms', 'Flats', 'Apartments', 'Rooms', 'Flats', 'Apartments', 'Rooms', 'Flats']
const testButtonsList: TabButtonItem[] = [
  {
    text: 'Apartments',
    value: 'Apartments',
  },
  {
    text: 'Rooms',
    value: 'Rooms',
  },
  {
    text: 'Flats',
    value: 'Flats',
  },
  {
    text: 'Apartments',
    value: 'Apartments',
  },
  {
    text: 'Rooms',
    value: 'Rooms',
  },
  {
    text: 'Flats',
    value: 'Flats',
  },
  {
    text: 'Apartments',
    value: 'Apartments',
  },
  {
    text: 'Rooms',
    value: 'Rooms',
  },
  {
    text: 'Flats',
    value: 'Flats',
  },
]
const testObjects = [
  {
    name: 'param name',
    value: 'param value',
  },
  {
    name: 'param name',
    value: 'param value',
  },
  {
    name: 'param name',
    value: 'param value',
  },
  {
    name: 'param name',
    value: 'param value',
  },
  {
    name: 'param name',
    value: 'param value',
  },
  {
    name: 'param name',
    value: 'param value',
  },
  {
    name: 'param name',
    value: 'param value',
  },
  {
    name: 'param name',
    value: 'param value',
  },
  {
    name: 'param name',
    value: 'param value',
  },
  {
    name: 'param name',
    value: 'param value',
  },
  {
    name: 'param name',
    value: 'param value',
  },
  {
    name: 'param name',
    value: 'param value',
  },
  {
    name: 'param name',
    value: 'param value',
  },
  {
    name: 'param name',
    value: 'param value',
  },
  {
    name: 'param name',
    value: 'param value',
  },
]

function DifferenceCheckbox() {
  return (
    <label className='text-base-500-reg-100-upper flex items-center gap-[18px]'>
      <input type='checkbox' className='peer invisible absolute' />
      <div className='flex h-[35px] w-[60px] items-center justify-end rounded-[50px] bg-base-100 px-[10px] peer-checked:justify-start'>
        <div className='bg-primary circle-[15px]' />
      </div>
      <div>Различающиеся характеристики</div>
    </label>
  )
}

function DifferenceSelector() {
  return (
    <div className='text-base-500-reg-100-upper relative'>
      <div className='flex items-center gap-[6px] text-primary after:block after:size-[10px] after:rotate-90 after:bg-icon-arrow after:filter-primary after:bg-default-contain'>
        Различающиеся характеристики
      </div>
      <div className='absolute inset-x-0 z-10 mt-[12px] rounded-[12px] bg-base-100 p-[12px]'>
        <Radio title='Различающиеся характеристики' name='diff' value='Различающиеся характеристики' checked={false} />
        <Radio title='Все характеристики' name='all' value='Все характеристики' checked={false} />
      </div>
    </div>
  )
}

function CompareController() {
  return (
    <div className='mt-[48px] rounded-[32px] bg-base-200 p-[32px]'>
      <Selector name='object-type' title='Apartments' showTitle={false} list={testList} isRadio />
      <div className='mt-[20px] flex items-center justify-between border-t border-t-base-600/10 pt-[20px]'>
        <DifferenceCheckbox />
        <button className='text-base-500-reg-100-upper flex items-center gap-[2px] text-base-650 after:block after:size-[20px] after:bg-icon-recycle-bin after:opacity-50 after:filter-base-600 after:bg-default-auto'>
          очистить всё
        </button>
      </div>
    </div>
  )
}

function CompareItem({ params }: { params: typeof testObjects }) {
  function showParams() {
    return params.map((param) => {
      return (
        <div
          key={param.value}
          className='text-base-300-lg-100 flex flex-col py-[41px] pb-[16px] odd:bg-base-200 group-first/slider:pl-[18px] md:h-[58px] md:justify-center md:py-0'
        >
          {param.value}
        </div>
      )
    })
  }

  return (
    <>
      <div className='mb-[24px] flex flex-col gap-[10px] md:mb-[32px] md:gap-0'>
        <Img
          src='/slider-1.png'
          width={100}
          height={100}
          className='h-[116px] w-[151px] rounded-[16px] object-cover object-center md:mb-[16px] md:h-[185px] md:w-[266px]'
        />
        <div className='text-header-500 md:mb-[6px]'>100000</div>
        <div className='text-base-400-lg-100'>address</div>
      </div>
      <div className='flex flex-col group-first/slider:ml-[-18px]'>{showParams()}</div>
    </>
  )
}

function showParamsNames() {
  return testObjects.map((item) => (
    <div
      key={item.name}
      className='text-base-400-reg-100 pb-[42px] pt-[16px] uppercase text-base-650 md:flex md:h-[58px] md:flex-col md:justify-center md:rounded-bl-[16px] md:rounded-tl-[16px] md:py-0 md:pl-[20px] md:odd:bg-base-200'
    >
      {item.name}
    </div>
  ))
}

function CompareObjects() {
  function showObjects() {
    return Array(6)
      .fill('')
      .map((_, index) => {
        return (
          <CarouselSlide key={index} className='group/slider w-full max-w-[163px] md:max-w-[286px]'>
            <CompareItem params={testObjects} />
          </CarouselSlide>
        )
      })
  }

  return (
    <Carousel className='relative mt-[31px] md:mt-0 md:pl-[266px]'>
      <div className='pointer-events-none absolute inset-0 z-10 mt-[196px] flex flex-col md:hidden'>
        {showParamsNames()}
      </div>
      <CarouselInner>{showObjects()}</CarouselInner>

      {testObjects.length > 2 && (
        <>
          <CarouselNavigationButtonPrev className='absolute left-[-32px] top-[92px] flex size-[16px] items-center justify-center after:block after:size-full after:rotate-180 after:bg-icon-arrow after:filter-base-600 after:bg-default-auto' />

          <CarouselNavigationButtonNext className='absolute right-[-32px] top-[92px] flex size-[16px] items-center justify-center after:block after:size-full after:bg-icon-arrow after:filter-base-600 after:bg-default-auto' />
        </>
      )}
      <button />
    </Carousel>
  )
}

function CompareContent() {
  const { isMobile } = useContext(AdaptiveContext)

  if (isMobile)
    return (
      <>
        <div className='mb-[32px] mt-[24px] flex items-center'>
          <button className='relative size-[21px] after:absolute after:inset-0 after:block after:size-full after:rotate-180 after:bg-icon-full-arrow after:bg-default-cover' />
          <div className='text-base-200-med-100 w-full text-center uppercase text-base-650'>Сравнение</div>
        </div>
        <div className='mb-[24px] overflow-auto scrollbar-transparent'>
          <TabButtons list={testButtonsList} />
        </div>
        <div className='relative overflow-hidden rounded-[24px] border border-base-400 px-[18px] pt-[14px]'>
          <div className='mb-[12px] flex items-center justify-between'>
            <DifferenceSelector />
            <button className='flex items-center justify-center bg-base-300 circle-[36px] after:block after:size-full after:bg-icon-recycle-bin after:bg-default-auto' />
          </div>
          <div className='absolute inset-x-0 h-[1px] w-full bg-base-400' />
          <CompareObjects />
        </div>
      </>
    )

  return (
    <>
      <CompareController />
      <div className='relative mt-[40px]'>
        <div className='absolute z-10 w-[266px]'>
          <div className='flex h-[185px] w-[266px] cursor-pointer flex-col justify-between rounded-[20px] border border-base-400 p-[20px]'>
            <div className='text-base-200-med-100 uppercase'>Добавить похожий объект</div>
            <button className='flex items-center justify-center self-end bg-base-300 circle-[40px] after:block after:size-[20px] after:bg-icon-transparent-plus after:bg-default-auto' />
          </div>
          <div className='mt-[100px] flex flex-col uppercase text-base-650'>{showParamsNames()}</div>
        </div>
        <CompareObjects />
      </div>
    </>
  )
}

export default CompareContent
