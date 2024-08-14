'use client'
import React, { useState } from 'react'

interface FilterSelectProps {
  values?: string[]
  defaultValue?: string
  title: string
}

const testValues = ['квартира', 'комната', 'малосемейка', 'общежитие', 'коммуналка', 'со скидкой']

function Option(value: string) {
  return
}

function FilterSelect({ values = testValues, defaultValue, title }: FilterSelectProps) {
  const [opened, setOpened] = useState(true)

  const openedClasses = () => {
    const listClasses = opened ? 'flex' : 'hidden'
    const btnClasses = opened ? '-rotate-90' : 'rotate-90'
    const containerClasses = opened ? 'rounded-b-0' : 'rounded-b-[16px]'
    return { listClasses, btnClasses, containerClasses }
  }
  return (
    <div>
      <div>{title}</div>
      <div
        className={`relative w-[260px] rounded-t-[16px] border border-base-400 bg-base-100 px-[16px] py-[12px] ${openedClasses().containerClasses}`}
      >
        <div className='flex items-center justify-between'>
          <div>{defaultValue ? defaultValue : values[0]}</div>
          <div
            className={`size-[14px] bg-icon-triangle-arrow bg-default-contain ${openedClasses().btnClasses}`}
            onClick={() => setOpened((prev) => !prev)}
          />
        </div>
        <div
          className={`absolute left-0 top-[100%] w-full flex-col gap-[16px] rounded-b-[16px] border border-base-400 bg-base-100 p-[16px] ${openedClasses().listClasses}`}
        >
          {values?.map((value, index) => <div key={index}>{value}</div>)}
        </div>
      </div>
    </div>
  )
}

export default FilterSelect
