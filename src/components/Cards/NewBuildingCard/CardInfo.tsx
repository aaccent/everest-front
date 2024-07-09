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
      <div className='absolute bottom-[8px] left-[8px] right-[8px] top-[8px] flex flex-col rounded-[20px] bg-base-100 p-[16px] md:inset-[14px]'>
        <div className='flex items-start justify-between'>
          <div className='flex flex-col gap-[8px]'>
            <div className='text-header-400'>{props.name}</div>
            <div className='text-base-300-lg-100 flex gap-[8px] opacity-50 before:block before:h-[15px] before:w-[12px] before:bg-icon-address before:bg-auto before:bg-center before:bg-no-repeat before:filter-base-600'>
              {props.address}
            </div>
          </div>
          <button
            className='flex size-[36px] items-center justify-center rounded-full bg-base-300 after:block after:size-[20px] after:rotate-45 after:bg-icon-transparent-plus after:bg-auto after:bg-center after:bg-no-repeat md:size-[40px] md:after:size-[24px]'
            onClick={onBtnClick}
          ></button>
        </div>
        <div className='mt-[20px] flex flex-col gap-[10px]'>
          {props['flat-types'].map((flat) => (
            <Link href={'#'} className='text-base-500-reg-200 group flex justify-between text-base-600' key={flat.id}>
              <div className='w-[80px] group-hover:text-primary'>{flat.name}</div>
              <div className='text-base-650'>
                от {flat['min-square']} м<sup>2</sup>
              </div>
              <div className=''>{formatPrice(flat['min-price'])}</div>
            </Link>
          ))}
        </div>
        <Link className='mt-auto flex w-full justify-center rounded-[16px] bg-base-300 py-[13px] uppercase' href={'#'}>
          подробнее об объекте
        </Link>
      </div>
    )
  } else {
    return (
      <div className='absolute bottom-[8px] left-[8px] right-[8px] rounded-[20px] bg-base-100 p-[16px] md:bottom-[14px] md:left-[14px] md:right-[14px]'>
        <div className='mb-[8px] flex items-end justify-between font-coolvetica'>
          <div className='text-header-400'>{props.name}</div>
          <div className='text-header-500'>{formatPrice(props['min-price'])}</div>
        </div>
        <div className='text-base-300-lg-100 flex gap-[8px] opacity-50 before:block before:h-[15px] before:w-[12px] before:bg-icon-address before:bg-auto before:bg-center before:bg-no-repeat before:filter-base-600'>
          {props.address}
        </div>
        <div className='mt-[12px] flex items-center justify-between'>
          <div className='text-base-400-lg-100 w-fit rounded-[10px] border border-base-400 px-[12px] py-[8px]'>
            {formatStatus(props.status)}
          </div>
          <button
            className='flex size-[36px] items-center justify-center rounded-full bg-base-300 after:block after:size-[20px] after:bg-icon-transparent-plus after:bg-auto after:bg-center after:bg-no-repeat md:size-[40px] md:after:size-[24px]'
            onClick={onBtnClick}
          ></button>
        </div>
      </div>
    )
  }
}

export default CardInfo