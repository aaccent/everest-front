'use client'
import React, { useState } from 'react'
import Checkbox from '@/ui/Checkbox'

interface FilterSelectProps {
  values?: string[]
  defaultValue?: string
  title: string
}

const testValues = ['квартира', 'комната', 'малосемейка', 'общежитие', 'коммуналка', 'со скидкой']

function FilterSelect({ values = testValues, defaultValue, title }: FilterSelectProps) {
  const [opened, setOpened] = useState(true)

  const openedClasses = () => {
    const listClasses = opened ? 'flex ' : 'hidden'
    const containerClasses = opened ? 'rounded-b-0 border-b-none' : 'md:rounded-b-[16px]'
    const btnClasses = opened ? 'after:-rotate-90' : 'after:rotate-90'
    return { listClasses, containerClasses, btnClasses }
  }
  return (
    <div>
      <div className='text-base-100-reg-100 md:text-base-500-reg-100-upper flex items-center justify-between pb-[18px] text-base-600'>
        {title}
        <div
          className={`after:block after:size-[14px] after:bg-icon-triangle-arrow after:bg-default-contain md:hidden ${openedClasses().btnClasses}`}
          onClick={() => setOpened((prev) => !prev)}
        />
      </div>
      <div
        className={`relative flex w-full items-center justify-between border-b border-base-400 bg-base-100 md:w-[260px] md:rounded-t-[16px] md:border md:px-[16px] md:py-[12px] ${openedClasses().containerClasses}`}
      >
        <div className='hidden items-center justify-between md:flex md:w-full'>
          <div className='text-base-400-lg-10 capitalize'>{defaultValue ? defaultValue : values[0]}</div>
          <div
            className={`cursor-pointer after:block after:size-[14px] after:bg-icon-triangle-arrow after:bg-default-contain md:block md:pb-0 ${openedClasses().btnClasses}`}
            onClick={() => setOpened((prev) => !prev)}
          />
        </div>
        <div
          className={`text-base-500-reg-100-upper md:text-base-400-lg-100 absolute inset-x-0 left-0 top-[100%] cursor-pointer flex-col gap-[16px] border-b border-base-400 bg-base-100 py-[24px] md:rounded-b-[16px] md:border md:p-[16px] ${openedClasses().listClasses}`}
        >
          {values?.map((value, index) => <Checkbox key={index} text={value} />)}
        </div>
      </div>
    </div>
  )
}

export default FilterSelect
