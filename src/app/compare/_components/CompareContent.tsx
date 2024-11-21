'use client'
import React, { useContext } from 'react'
import Selector from '@/ui/inputs/Selector'
import Button from '@/ui/buttons/Button'
import { AdaptiveContext } from '@/features/adaptive'
import TabButtons, { TabButtonItem } from '@/components/TabButtons'
import Carousel, { CarouselInner, CarouselSlide } from '@/components/Carousel/Carousel'
import Img from '@/ui/Img'

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
    <div className='text-base-500-reg-100-upper'>
      <div>
        <div className='hidden md:block' />
      </div>
      <div className='flex items-center gap-[6px] after:block after:size-[10px] after:rotate-90 after:bg-icon-arrow after:filter-base-600 after:bg-default-contain'>
        Различающиеся характеристики
      </div>
    </div>
  )
}

function CompareController() {
  return (
    <div>
      <Selector name='object-type' title='Apartments' showTitle={false} list={testList} isRadio />
      <div>
        <DifferenceCheckbox />
        <Button>очистить всё</Button>
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
          className='text-base-300-lg-100 flex flex-col py-[41px] pb-[16px] odd:bg-base-200 group-first/slider:pl-[18px]'
        >
          {param.value}
        </div>
      )
    })
  }

  return (
    <>
      <div className='mb-[24px] flex flex-col gap-[10px]'>
        <Img
          src='/slider-1.png'
          width={100}
          height={100}
          className='h-[116px] w-[151px] rounded-[16px] object-cover object-center'
        />
        <div className='text-header-500'>100000</div>
        <div className='text-base-400-lg-100'>address</div>
      </div>
      <div className='flex flex-col group-first/slider:ml-[-18px]'>{showParams()}</div>
    </>
  )
}

function CompareObjects() {
  function showObjects() {
    return Array(6)
      .fill('')
      .map((_, index) => {
        return (
          <CarouselSlide key={index} className='group/slider w-full max-w-[163px]'>
            <CompareItem params={testObjects} />
          </CarouselSlide>
        )
      })
  }

  return (
    <Carousel className='relative mt-[31px]'>
      <div className='pointer-events-none absolute inset-0 z-10 mt-[196px] flex flex-col'>
        {testObjects.map((item) => (
          <div key={item.name} className='text-base-400-reg-100 pb-[42px] pt-[16px] uppercase text-base-650'>
            {item.name}
          </div>
        ))}
      </div>
      <CarouselInner>{showObjects()}</CarouselInner>
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
            <DifferenceCheckbox />
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
    </>
  )
}

export default CompareContent
