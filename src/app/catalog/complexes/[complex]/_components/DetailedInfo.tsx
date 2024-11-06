'use client'
import React, { useState } from 'react'
import { DetailComplex } from '@/types/catalog/Complex'
import Link from 'next/link'
import { formatStatusByQuarter } from '@/features/utility/date'
import { Characteristic } from '@/types/Characteristic'

function showDetails(array: Characteristic[]) {
  return array.map((item, index) => {
    return (
      <li className='text-base-400-lg-100 flex items-center justify-between' key={index}>
        <div className='text-base-650'>{item.name}</div>
        <div className='text-base-600'>
          {item.name === 'Срок сдачи' && typeof item.value === 'number'
            ? formatStatusByQuarter(item.value)
            : item.value}
        </div>
      </li>
    )
  })
}

interface Props {
  complex: DetailComplex
}

function DetailedInfo({ complex }: Props) {
  const [opened, setOpened] = useState<boolean>()
  return (
    <div
      className={`group absolute left-[20px] right-[20px] top-[48px] rounded-[20px] bg-base-100 md:left-[56px] md:right-auto md:top-[56px] md:min-w-[362px] ${opened ? 'active' : ''}`}
    >
      <button
        className='flex w-full items-center justify-between p-[24px] text-left'
        onClick={() => setOpened((prev) => !prev)}
      >
        <div className='flex flex-col gap-[2px]'>
          <div className='text-base-400-lg-100 text-base-650'>Жилой комплекс</div>
          <div className='text-base-100-reg-100'>{complex.name}</div>
        </div>
        <div className='size-[36px] rounded-full bg-base-300 duration-150 ease-in after:block after:size-full after:bg-icon-transparent-plus after:bg-default-auto group-[.active]:rotate-45' />
      </button>
      {!!opened && (
        <div className='border-t border-t-base-600/10 p-[24px]'>
          <ul className='flex flex-col gap-[14px]'>{showDetails(complex.characteristics)}</ul>
          <Link
            href={complex.presentationLink || ''}
            className='text-base-500-reg-100-upper mt-[24px] block w-full rounded-[16px] bg-base-300 py-[12px] text-center'
          >
            скачать презентацию
          </Link>
        </div>
      )}
    </div>
  )
}

export default DetailedInfo
