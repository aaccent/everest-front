'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useFilter } from '@/features/useFilter'
import FilterPopup from '@/ui/popups/FilterPopup/FilterPopup'
import { PopupContext } from '@/features/Popup'
import { QuickFilters } from '@/types/FiltersType'

type TextButtonProps = {
  onClick: () => void
  text: string
}

function TextDetailFilterButton({ text, onClick }: TextButtonProps) {
  return (
    <button
      className='text-base-400-lg-100 absolute right-0 top-[-100%] flex items-center gap-[6px] text-primary after:block after:size-[20px] after:bg-icon-detail-filter after:filter-primary after:bg-default-contain'
      type='button'
      onClick={onClick}
    >
      {text}
    </button>
  )
}

type IconButtonProps = Omit<TextButtonProps, 'text'> & { activeFiltersCount: number }

function IconDetailFilterButton({ onClick, activeFiltersCount }: IconButtonProps) {
  return (
    <div className='relative'>
      <div
        className={`text-base-500-reg-200 absolute right-[5px] top-[-5px] hidden items-center justify-center bg-primary text-base-100 circle-[24px] md:flex ${activeFiltersCount ? '' : 'md:hidden'}`}
      >
        {activeFiltersCount}
      </div>
      <button
        className='flex size-[42px] items-center justify-center rounded-[12px] bg-base-100 p-[10px] after:size-[21px] after:bg-icon-filter after:bg-default'
        type='button'
        onClick={onClick}
      />
    </div>
  )
}

type Props = {
  categoryName: string
  quickFilters: QuickFilters
  objectsAmount?: number
  text?: string
}

function DetailFilterButton({ categoryName, quickFilters, objectsAmount, text }: Props) {
  const { filter } = useFilter()
  const [count, setCount] = useState<number>(filter.parsed.length)
  const { openDynamicPopup } = useContext(PopupContext)

  useEffect(() => {
    setCount(filter.parsed.length)
  }, [filter])

  const onClickHandle = () => openDynamicPopup('filterPopup')

  function showButton() {
    if (text) return <TextDetailFilterButton onClick={onClickHandle} text={text} />
    return <IconDetailFilterButton onClick={onClickHandle} activeFiltersCount={count} />
  }

  return (
    <>
      {showButton()}
      <FilterPopup category={categoryName} quickFilters={quickFilters} objectsAmount={objectsAmount} />
    </>
  )
}

export default DetailFilterButton
