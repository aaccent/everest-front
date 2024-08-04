'use client'
import React, { useState } from 'react'
import { ComplexInDetailed } from '@/types/Complex'
import Link from 'next/link'
import { formatStatus } from '@/features/date'

type Details = Pick<ComplexInDetailed, 'name' | 'details' | 'presentationLink'>

const fakeInfo = [
  {
    name: 'Застройщик',
    value: 'Донстрой',
  },
  {
    name: 'Класс объекта',
    value: 'Бизнес',
  },
  {
    name: 'Срок сдачи',
    value: 1817293089000,
  },
]

function showDetails(array: { name: string; value: string | number }[]) {
  return array.map((item, index) => {
    return (
      <li className='text-base-400-lg-100 flex items-center justify-between' key={index}>
        <div className='text-base-650'>{item.name}</div>
        <div className='text-base-600'>
          {item.name === 'Срок сдачи' && typeof item.value === 'number' ? formatStatus(item.value) : item.value}
        </div>
      </li>
    )
  })
}

function DetailedInfo({ name, details, presentationLink }: Details) {
  const [opened, setOpened] = useState<boolean>()
  return (
    <div
      className={`group absolute left-[40px] right-[40px] top-[48px] rounded-[20px] bg-base-100 p-[24px] md:left-[112px] md:right-auto md:top-[56px] md:min-w-[362px] ${opened ? 'active' : ''}`}
    >
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-[2px]'>
          <div className='text-base-400-lg-100 text-base-650'>Жилой комплекс</div>
          <div className='text-base-100-reg-100'>{name}</div>
        </div>
        <button
          className='size-[36px] rounded-full bg-base-300 duration-150 ease-in after:block after:size-full after:bg-icon-transparent-plus after:bg-default-auto group-[.active]:rotate-45'
          onClick={() => setOpened((prev) => !prev)}
        ></button>
      </div>
      {opened ? (
        <>
          <div className='absolute inset-x-0 mt-[24px] h-[1px] bg-base-600/10'></div>
          <ul className='mt-[49px] flex flex-col gap-[14px]'>
            {details ? showDetails(details) : showDetails(fakeInfo)}
          </ul>
          <Link
            href={presentationLink || ''}
            className='text-base-500-reg-100-upper mt-[24px] block w-full rounded-[16px] bg-base-300 py-[12px] text-center'
          >
            скачать презентацию
          </Link>
        </>
      ) : null}
    </div>
  )
}

export default DetailedInfo
