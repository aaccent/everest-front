import React from 'react'
import { DecorativeBlock } from '@/layout/DecorativeSection'
import { SecondaryDetailObject } from '@/types/SecondaryDetailObject'
import Section from '@/layout/Section'
import Img from '@/ui/Img'
import Carousel, { CarouselInner } from '@/components/Carousel/Carousel'
import { CarouselProgressBar } from '@/components/Carousel/CarouselProgressBar'
import { CarouselSlide } from '@/components/Carousel/CarouselSlide'
import MapObjectsButton from '@/ui/buttons/MapObjectsButton'
import PropItem from '@/components/PropItem'
import Button from '@/ui/buttons/Button'
import { showDate } from '@/features/date'

import styles from './ObjectHero.module.css'

function ActionButton({ className }: { className?: string }) {
  return (
    <button
      className={`flex size-[42px] items-center justify-center rounded-[16px] border border-base-400 after:size-[16px] after:filter-base-600 after:bg-default md:after:size-[18px] ${className}`}
      type='button'
    />
  )
}

interface GalleryProps {
  list: string[]
}

function Gallery({ list }: GalleryProps) {
  function showImages() {
    return list.map((img, i) => (
      <CarouselSlide
        className='relative before:absolute before:inset-0 before:z-10 before:bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0)100%);] before:opacity-50'
        key={i}
      >
        <Img className='block h-full w-full' src='/no-photo.jpg' fill />
      </CarouselSlide>
    ))
  }

  return (
    <Carousel className='h-full'>
      <CarouselInner>{showImages()}</CarouselInner>
      <CarouselProgressBar className='!absolute inset-x-[92px] !bottom-[24px] z-10 !block !w-auto *:bg-base-100' />
    </Carousel>
  )
}

interface Props {
  item: SecondaryDetailObject
}

function ObjectHero({ item }: Props) {
  function showProps() {
    return item.characteristics.map((prop, index) => (
      <PropItem title={prop.name} key={index}>
        {prop.value}
      </PropItem>
    ))
  }

  return (
    <Section className='!mt-0 md:!pt-[4px]' containerClassName='flex flex-col gap-[8px] md:gap-[16px] md:flex-row'>
      <DecorativeBlock
        className='!mb-0 h-[260px] w-full bg-base-200 !pt-0 md:h-auto md:rounded-[32px]'
        decorativeClassName='md:-scale-x-100'
        type='medium'
      >
        <Gallery list={item.gallery} />
      </DecorativeBlock>
      <DecorativeBlock
        className='!rounded-[20px] bg-base-200 p-[20px] md:w-full md:max-w-[644px] md:rounded-[32px] md:px-[40px] md:py-[70px]'
        type='medium'
        decorativeClassName='hidden md:block'
      >
        <div className='mb-[20px] flex justify-between gap-[11px]'>
          <div className='flex w-full flex-col gap-[12px]'>
            <div className='flex justify-between gap-[20px]'>
              <h1 className='text-header-300'>{item.name}</h1>
              <div className='text-base-300-lg-100 mt-[15px] hidden flex-col gap-[8px] md:flex'>
                <span>Марат Лутфуллин</span>
                <span className='flex items-center gap-[6px] text-base-600/50 before:size-[19px] before:bg-icon-clip before:opacity-50 before:filter-base-600 before:bg-default'>
                  {showDate(item.publicationTime)}
                </span>
              </div>
            </div>
            {!!item.address && (
              <span className='text-base-300-lg-100 !before:bg-left flex items-center gap-[2px] text-base-600/50 before:size-[16px] before:bg-icon-address before:opacity-50 before:filter-base-600 before:bg-default md:gap-[16px] md:before:hidden'>
                <MapObjectsButton className='hidden md:flex' />
                {item.address}
              </span>
            )}
          </div>
          <MapObjectsButton className='h-[36px] w-[58px] md:hidden' />
        </div>
        <div className='mb-[20px] border-y border-y-base-600/10 py-[20px] md:mb-[43px] md:border-y-0 md:py-0'>
          <ul
            className={`${styles.propItems} mb-[12px] grid grid-cols-1 gap-y-[10px] md:grid-cols-2 md:gap-0 md:pb-[20px]`}
          >
            {showProps()}
          </ul>
          <a
            className='text-base-500-reg-100-upper flex items-center gap-[4px] text-primary after:size-[18px] after:bg-icon-full-arrow after:filter-primary after:bg-default'
            href='#'
          >
            Все характеристики
          </a>
        </div>
        <div>
          <div className='mb-[18px] flex items-baseline gap-[8px] md:mb-[32px]'>
            <span className='text-header-400'>5 000 000 ₽</span>
          </div>
          <div className='flex flex-col gap-[20px] md:flex-row'>
            <Button className='h-[50px] w-full md:h-[42px] md:w-fit md:p-0 md:px-[46px]'>Забронировать</Button>
            <div className='flex w-full justify-between'>
              <div className='flex gap-[6px]'>
                <ActionButton className='after:bg-icon-heart' />
                <ActionButton className='after:bg-icon-scale' />
                <ActionButton className='after:bg-icon-share' />
                <ActionButton className='after:bg-icon-pdf' />
              </div>
              <div className='text-base-400-lg-100 flex flex-col items-end gap-[4px]'>
                <span className='text-base-600/50'>Цена за метр:</span>
                <span>{item.pricePerMeter} ₽ / м2</span>
              </div>
            </div>
          </div>
        </div>
      </DecorativeBlock>
    </Section>
  )
}

export default ObjectHero
