'use client'

import React, { useState } from 'react'

import { Navigation, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import './Slider.css'

import Image from 'next/image'
import Link from 'next/link'

interface FlatTypes {
  id: string
  name: string
  'min-square': number
  'min-price': number
}

interface Card {
  id: string
  name: string
  address: string
  'text-code': string
  'category-code': string
  'min-price': number
  status: number
  tags: string[]
  'flat-types': FlatTypes[]
  photos: string[]
}

interface SliderProps {
  list: Card[]
}

function Slider(props: SliderProps) {
  function showSlider() {
    return props.list.map((card) => (
      <SwiperSlide key={card.id}>
        <Slide {...card} />
      </SwiperSlide>
    ))
  }

  return (
    <>
      <div className='hidden absolute top-[20px] right-0 w-[89px] h-[42px] bg-base-300 rounded-[12px] overflow-hidden md:block'>
        <div className='relative flex w-full h-full after:absolute after:top-0 after:left-[50%] after:translate-x-1/2 aftre:block after:w-[1px] after:h-[8px] after:bg-base-400 before:absolute before:bottom-0 before:left-[50%] before:translate-x-1/2 aftre:block before:w-[1px] before:h-[8px] before:bg-base-400'>
          <button className='button-prev p-[16px] flex justify-center items-center w-1/2 after:block after:size-full after:filter-base-600 after:rotate-180 after:bg-center after:bg-contain after:bg-no-repeat after:bg-icon-arrow'></button>
          <button className='button-next p-[16px] flex justify-center items-center w-1/2 after:block after:size-full after:filter-base-600 after:bg-center after:bg-contain after:bg-no-repeat after:bg-icon-arrow'></button>
        </div>
      </div>
      <Link
        href={'#'}
        className='absolute top-0 right-0 py-[10px] flex justify-center gap-[4px] w-[70px] bg-base-300 rounded-[12px] overflow-hidden text-base-500-reg-100-upper after:block after:size-[14px] after:rotate-90 after:bg-center after:bg-auto after:bg-no-repeat after:bg-icon-arrow-up md:hidden'
      >
        все
      </Link>
      <div className='scroll-bar'></div>
      <Swiper
        modules={[Navigation, Scrollbar]}
        slidesPerView={1.1}
        spaceBetween={12}
        navigation={{
          prevEl: '.button-prev',
          nextEl: '.button-next',
        }}
        scrollbar={{
          el: '.scroll-bar',
          draggable: true,
        }}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
        }}
      >
        {showSlider()}
      </Swiper>
    </>
  )
}

function Slide(props: Card) {
  const [opened, setOpened] = useState<boolean>(false)

  const onBtnClick = () => {
    setOpened((prev) => !prev)
  }

  function cardInfo() {
    return opened ? fullInfo() : shortInfo()
  }

  function showTags() {
    return (
      <div className='absolute top-[10px] left-[8px] flex gap-[4px] md:top-[14px] md:left-[14px]'>
        {props.tags.map((tag, index) => (
          <div
            className='flex justify-center items-center py-[5px] px-[8px] w-fit rounded-[10px] bg-base-600 text-base-100 text-base-400-lg-100 md:py-[6.5px] md:px-[12px]'
            key={index}
          >
            {tag}
          </div>
        ))}
      </div>
    )
  }

  function formatStatus(timestamp: typeof props.status) {
    const date = new Date(timestamp)
    const quarter = Math.floor((date.getMonth() + 3) / 3)
    const year = date.getFullYear()
    const quarterRoman = convertToRoman(quarter)
    return `${quarterRoman} кв. ${year} год`
  }

  function convertToRoman(num: number): string {
    switch (num) {
      case 1:
        return 'I'
      case 2:
        return 'II'
      case 3:
        return 'III'
      case 4:
        return 'IV'
    }
    return ''
  }

  function formatPrice(price: (typeof props)['min-price']) {
    let shortPrice
    const digits = price.toString().length

    if (digits > 6) {
      shortPrice = price / 1000000
    }
    return `от ${shortPrice} млн ₽`
  }

  function shortInfo() {
    return (
      <div className='absolute bottom-[8px] left-[8px] right-[8px] p-[16px] bg-base-100 rounded-[20px] md:bottom-[14px] md:left-[14px] md:right-[14px]'>
        <div className='mb-[8px] flex items-end justify-between font-coolvetica'>
          <div className='text-header-400'>{props.name}</div>
          <div className='text-header-500'>{formatPrice(props['min-price'])}</div>
        </div>
        <div className='flex gap-[8px] text-base-300-lg-100 opacity-50 before:w-[12px] before:h-[15px] before:block before:bg-auto before:bg-no-repeat before:bg-center before:bg-icon-address before:filter-base-600'>
          {props.address}
        </div>
        <div className='flex items-center justify-between mt-[12px]'>
          <div className='w-fit py-[8px] px-[12px] border border-base-400 rounded-[10px] text-base-400-lg-100'>
            {formatStatus(props.status)}
          </div>
          <button
            className='flex items-center justify-center size-[36px] bg-base-300 rounded-full after:block after:size-[20px] after:bg-center after:bg-auto after:bg-no-repeat after:bg-icon-transparent-plus md:size-[40px] md:after:size-[24px]'
            onClick={onBtnClick}
          ></button>
        </div>
      </div>
    )
  }

  function fullInfo() {
    return (
      <div className='absolute bottom-[8px] left-[8px] right-[8px] top-[8px] flex flex-col p-[16px] bg-base-100 rounded-[20px] md:inset-[14px]'>
        <div className='flex items-start justify-between'>
          <div className='flex flex-col gap-[8px]'>
            <div className='text-header-400'>{props.name}</div>
            <div className='flex gap-[8px] text-base-300-lg-100 opacity-50 before:w-[12px] before:h-[15px] before:block before:bg-auto before:bg-no-repeat before:bg-center before:bg-icon-address before:filter-base-600'>
              {props.address}
            </div>
          </div>
          <button
            className='flex items-center justify-center size-[36px] bg-base-300 rounded-full after:block after:size-[20px] after:bg-center after:bg-auto after:bg-no-repeat after:bg-icon-transparent-plus after:rotate-45 md:size-[40px] md:after:size-[24px]'
            onClick={onBtnClick}
          ></button>
        </div>
        <div className='flex flex-col gap-[10px] mt-[20px]'>
          {props['flat-types'].map((flat) => (
            <Link href={'#'} className='group flex justify-between text-base-500-reg-200 text-base-600' key={flat.id}>
              <div className='w-[80px] group-hover:text-primary'>{flat.name}</div>
              <div className='text-base-650'>
                от {flat['min-square']} м<sup>2</sup>
              </div>
              <div className=''>{formatPrice(flat['min-price'])}</div>
            </Link>
          ))}
        </div>
        <Link className='flex justify-center mt-auto py-[13px] w-full bg-base-300 rounded-[16px] uppercase' href={'#'}>
          подробнее об объекте
        </Link>
      </div>
    )
  }

  return (
    <div className='group relative rounded-[20px] overflow-hidden md:rounded-[24px]'>
      <Image
        className='w-[320px] h-[250px] object-center object-cover md:w-full md:h-[388px] transition-transform duration-500 hover:scale-110 hover:transition-transform hover:duration-500'
        src={props.photos[0]}
        alt={''}
        width={512}
        height={388}
      />

      {showTags()}
      {cardInfo()}
    </div>
  )
}

export default Slider
