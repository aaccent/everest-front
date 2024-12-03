'use client'
import React, { useEffect, useState } from 'react'
import { Sort } from '@/types/FiltersType'
import { useSort } from '@/features/useSort'
import Radio from '@/ui/inputs/Radio'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import { IsDesktop, IsMobile } from '@/features/adaptive'

interface SortButtonProps {
  sorts: Sort[]
}

function SortButton({ sorts }: SortButtonProps) {
  const [sortValue, setSortValue] = useState<string>(sorts[0]?.name || '')
  const [opened, setOpened] = useState<boolean>(false)
  const { addSort, getSortFromUrl } = useSort()

  useEffect(() => {
    const currentValue = sorts.find((item) => item.value === getSortFromUrl())
    if (!currentValue) return

    setSortValue(currentValue?.name || sorts[0].name)
  }, [])

  function clickHandle(sort: Sort) {
    if (sort.value === 'default') {
      addSort(null)
    } else {
      addSort(sort.value)
    }
    setSortValue(sort.name)
    setOpened(false)
  }

  function showSorts() {
    return sorts.map((sort, index) => (
      <Radio
        key={index}
        onClick={() => clickHandle(sort)}
        value={sort.value}
        name={sort.name}
        title={sort.name}
        checked={sort.name === sortValue}
      />
    ))
  }

  return (
    <>
      <IsDesktop>
        <button
          className='text-base-500-reg-100-upper relative w-fit min-w-[200px] text-left'
          onClick={() => setOpened((prev) => !prev)}
        >
          <span className='text-base-650'>сортировка: </span>
          <span>{sortValue}</span>
          <div
            className={`absolute inset-x-0 top-[35px] z-30 flex-col gap-[16px] rounded-[16px] bg-base-100 p-[20px] ${opened ? 'flex' : 'hidden'}`}
          >
            {showSorts()}
          </div>
        </button>
      </IsDesktop>
      <IsMobile>
        <button
          className='flex w-full items-center justify-between text-left after:block after:size-[14px] after:bg-icon-triangle-arrow after:bg-default-contain'
          onClick={() => setOpened(true)}
        >
          <div>
            <div className='text-base-100-reg-100'>Сортировать</div>
            <div className='text-base-500-reg-100-upper mt-[4px] text-base-650'>{sortValue}</div>
          </div>
        </button>
        <div
          className={`absolute inset-0 rounded-t-[24px] bg-base-100 px-[20px] pt-[24px] ${opened ? 'block' : 'hidden'}`}
        >
          <div className='mb-[18px] flex items-center justify-between border-b border-b-base-600/10 pb-[33px]'>
            <button
              className='flex size-[36px] items-center justify-center rounded-full bg-base-300 after:block after:size-[18px] after:-rotate-90 after:bg-icon-arrow-up after:filter-base-600 after:bg-default-contain'
              onClick={() => setOpened(false)}
            />
            <div className='text-header-300'>Сортировка</div>
            <ClosePopupButton />
          </div>
          <div className='text-base-100-reg-100 mb-[24px] flex items-center justify-between after:block after:size-[14px] after:-rotate-90 after:bg-icon-triangle-arrow after:bg-default-contain'>
            Сортировать
          </div>
          <div className='flex flex-col gap-[16px]'>{showSorts()}</div>
        </div>
      </IsMobile>
    </>
  )
}

export default SortButton
