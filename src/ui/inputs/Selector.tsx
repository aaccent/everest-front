'use client'
import React, { useState } from 'react'
import Checkbox from '@/ui/inputs/Checkbox'
import Radio from '@/ui/inputs/Radio'

interface FilterSelectProps {
  values: string[]
  defaultValue?: string
  title?: string
  isRadio?: boolean
}

const testValues = ['квартира', 'комната', 'малосемейка', 'общежитие', 'коммуналка', 'со скидкой']

function Selector({ values = testValues, defaultValue, title, isRadio }: FilterSelectProps) {
  const [opened, setOpened] = useState(false)

  const openedClasses = () => {
    const listClasses = opened ? 'flex ' : 'hidden'
    const containerClasses = opened ? 'rounded-b-0' : ''
    const btnClasses = opened ? 'after:-rotate-90 md:after:-rotate-90' : ''
    return { listClasses, containerClasses, btnClasses }
  }

  function showOptions() {
    return values?.map((value, index) =>
      isRadio ? (
        <Radio key={index} text={value} radioName='filter' />
      ) : (
        <Checkbox key={index} text={value} isInSelect />
      ),
    )
  }

  return (
    <div className='border-b border-b-base-600/10 pb-[18px] first:border-t first:border-t-base-600/10 first:pt-[18px] md:border-b-0 md:pb-0 md:first:border-t-0'>
      <div className='flex items-center justify-between'>
        {title && <div className='text-base-100-reg-100 md:text-base-500-reg-100-upper text-base-600'>{title}</div>}
        <div
          className={`after:block after:size-[14px] after:bg-icon-triangle-arrow after:bg-default-contain md:hidden ${openedClasses().btnClasses}`}
          onClick={() => setOpened((prev) => !prev)}
        />
      </div>
      <div
        className={`relative z-10 flex w-full items-center justify-between bg-base-100 md:w-[260px] md:rounded-b-[16px] md:rounded-t-[16px] md:px-[16px] md:py-[12px] ${openedClasses().containerClasses}`}
      >
        <div className='hidden items-center justify-between md:flex md:w-full'>
          <div className='text-base-400-lg-100 capitalize text-base-650'>{defaultValue ? defaultValue : values[0]}</div>
          <div
            className={`cursor-pointer after:block after:size-[14px] after:bg-icon-triangle-arrow after:bg-default-contain md:block md:pb-0 md:after:rotate-90 ${openedClasses().btnClasses}`}
            onClick={() => setOpened((prev) => !prev)}
          />
        </div>
        <div
          className={`text-base-500-reg-100-upper md:text-base-400-lg-100 absolute inset-x-0 left-0 top-[100%] cursor-pointer flex-col gap-[16px] border-b border-b-base-600/10 bg-base-100 py-[24px] md:rounded-b-[16px] md:p-[16px] ${openedClasses().listClasses}`}
        >
          {showOptions()}
        </div>
      </div>
    </div>
  )
}

export default Selector
