'use client'
import React, { useState } from 'react'
import Checkbox from '@/ui/inputs/Checkbox'
import Radio from '@/ui/inputs/Radio'
import { IsDesktop, IsMobile } from '@/features/adaptive'

interface FilterSelectProps {
  values: string[]
  title: string
  isRadio?: boolean
  inQuickFilter?: boolean
}

const testValues = ['квартира', 'комната', 'малосемейка', 'общежитие', 'коммуналка', 'со скидкой']

function Selector({ values = testValues, title, isRadio, inQuickFilter }: FilterSelectProps) {
  const [opened, setOpened] = useState(false)

  const openedClasses = opened ? 'opened' : ''

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
    <div
      className={`group relative border-b border-b-base-600/10 bg-base-100 pb-[18px] first:border-t first:border-t-base-600/10 first:pt-[18px] md:w-[260px] md:rounded-[16px] md:border-b-0 md:px-[16px] md:py-[12px] md:first:border-t-0 ${openedClasses}`}
      onClick={() => setOpened((prev) => !prev)}
    >
      <button
        type='button'
        className='text-base-100-reg-100 md:text-base-400-lg-100 flex w-full items-center justify-between after:block after:size-[14px] after:bg-icon-triangle-arrow after:bg-default-contain group-[.opened]:after:-rotate-90 md:pb-0 md:text-base-650 md:after:rotate-90'
      >
        <IsDesktop>{inQuickFilter ? title : 'Выбрать'}</IsDesktop>
        <IsMobile>{title}</IsMobile>
      </button>
      <div className='text-base-500-reg-100-upper md:text-base-400-lg-100 absolute inset-x-0 z-10 hidden flex-col gap-[16px] border-b border-b-base-600/10 bg-base-100 py-[24px] group-[.opened]:flex md:rounded-b-[16px] md:px-[16px] md:group-[.opened]:border-b-0'>
        {showOptions()}
      </div>
    </div>
  )
}

export default Selector
