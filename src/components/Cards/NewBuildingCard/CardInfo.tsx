'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { formatPrice } from '@/features/price'
import { formatStatus } from '@/features/date'
import { NewBuilding } from '@/components/Cards/CardsTypes'

function CardInfo(props: NewBuilding) {
  const [opened, setOpened] = useState<boolean>(false)
  const onBtnClick = () => {
    setOpened((prev) => !prev)
  }

  if (opened) {
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
  } else {
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
}

export default CardInfo
