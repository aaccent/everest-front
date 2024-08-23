'use client'
import React, { useState } from 'react'
import Checkbox from '@/ui/inputs/Checkbox'
import Radio from '@/ui/inputs/Radio'
import { useCategoryFilter } from '@/features/useCategoryFilter'

interface FilterSelectProps {
  id: number
  values: string[]
  isRadio?: boolean
  showTitle: boolean
  name: string
  className?: string
}

function Selector({ values, isRadio, showTitle, name, id, className }: FilterSelectProps) {
  const [opened, setOpened] = useState(false)
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const { findFilter, addFilter } = useCategoryFilter()

  const onCheckboxClick = (clickedValue: string) => {
    if (selectedValues.includes(clickedValue)) {
      setSelectedValues([...values, clickedValue])
    } else {
      setSelectedValues(values.filter((val) => val !== clickedValue))
    }
  }

  // useEffect(() => {
  //   const currentFilter = findFilter<{ id: number; value: string[] }>(id)
  //   if (currentFilter && valuesRef.current) {
  //     valuesRef.current.textContent = currentFilter.value.join(',')
  //   }
  // }, [])

  const openedClasses = opened ? 'opened' : ''

  function showOptions() {
    return values?.map((value, index) =>
      isRadio ? (
        <Radio key={index} text={value} name={name} />
      ) : (
        <Checkbox key={index} text={value} isInSelect name={name} onClick={onCheckboxClick} />
      ),
    )
  }

  return (
    <div className='flex flex-col gap-[8px]'>
      {showTitle && <div className='text-base-500-reg-100-upper'>{name}</div>}
      <div
        className={`group relative select-none border-b border-b-base-600/10 bg-base-100 pb-[18px] first:border-t first:border-t-base-600/10 first:pt-[18px] md:w-[260px] md:rounded-[16px] md:border-b-0 md:px-[16px] md:py-[12px] md:first:border-t-0 ${openedClasses} ${className}`}
        onClick={() => setOpened((prev) => !prev)}
      >
        <button
          type='button'
          className='text-base-100-reg-100 md:text-base-400-lg-100 flex w-full select-none items-center justify-between after:block after:size-[14px] after:bg-icon-triangle-arrow after:bg-default-contain group-[.opened]:after:-rotate-90 md:pb-0 md:text-base-650 md:after:rotate-90'
        >
          <div>{selectedValues.length ? selectedValues.join(',') : 'Выбрать'}</div>
        </button>
        <div className='text-base-500-reg-100-upper md:text-base-400-lg-100 absolute inset-x-0 z-10 hidden select-none flex-col gap-[16px] border-b border-b-base-600/10 bg-base-100 py-[24px] group-[.opened]:flex md:rounded-b-[16px] md:px-[16px] md:group-[.opened]:border-b-0'>
          {showOptions()}
        </div>
      </div>
    </div>
  )
}

export default Selector
