'use client'

import React, { useContext, useEffect, useState } from 'react'
import { useFilter } from '@/features/useFilter'
import { PopupContext } from '@/features/Popup'
import { FilterBlock, QuickFilters } from '@/types/FiltersType'
import { CategoryContext } from '@/layout/catalog/CategoryContext'

type TextButtonProps = {
  onClick: () => void
  text: string
  className?: string
  activeFiltersCount?: number
  showActiveFiltersCount?: boolean
}

function TextDetailFilterButton({
  text,
  onClick,
  className,
  activeFiltersCount,
  showActiveFiltersCount,
}: TextButtonProps) {
  return (
    <div className={`${showActiveFiltersCount ? 'relative' : 'static hidden'}`}>
      <div
        className={`text-base-500-reg-200 inset-y-1/2 right-[16px] -translate-y-1/2 items-center justify-center bg-base-100 text-primary circle-[18px] ${showActiveFiltersCount && 'absolute'} ${activeFiltersCount ? 'flex' : 'hidden'} `}
      >
        {activeFiltersCount}
      </div>
      <button className={`${className}`} type='button' onClick={onClick}>
        {text}
      </button>
    </div>
  )
}

type IconButtonProps = Omit<TextButtonProps, 'text'>

function IconDetailFilterButton({ onClick, activeFiltersCount, className }: IconButtonProps) {
  return (
    <div className='relative'>
      <div
        className={`text-base-500-reg-200 absolute right-[5px] top-[-5px] flex items-center justify-center bg-primary text-base-100 circle-[24px] ${activeFiltersCount ? '' : 'hidden'}`}
      >
        {activeFiltersCount}
      </div>
      <button className={`${className}`} type='button' onClick={onClick} />
    </div>
  )
}

type Props = {
  getFilters: () => Promise<FilterBlock[]>
  quickFilters: QuickFilters
  detailedFiltersInputs: FilterBlock[]
  categoryName: string
  initCount?: number
  text?: string
  className?: string
  showActiveFiltersCount?: boolean
}

function DetailFilterButton({ initCount = 0, text, className, showActiveFiltersCount, ...popupProps }: Props) {
  const { filter } = useFilter()
  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(filter.parsed.length)
  const { openPopup, updateProps } = useContext(PopupContext)
  const { list } = useContext(CategoryContext)
  const objectsCount = list ? list.total : initCount

  useEffect(() => {
    updateProps('filter', { objectsCount })
  }, [list, initCount])

  useEffect(() => {
    setActiveFiltersCount(filter.parsed.length)
  }, [filter])

  const onClickHandle = () => {
    openPopup({ name: 'filter', args: { ...popupProps, objectsCount } })
  }

  if (text)
    return (
      <TextDetailFilterButton
        onClick={onClickHandle}
        text={text}
        className={className}
        activeFiltersCount={activeFiltersCount}
        showActiveFiltersCount={showActiveFiltersCount}
      />
    )

  return (
    <IconDetailFilterButton onClick={onClickHandle} activeFiltersCount={activeFiltersCount} className={className} />
  )
}

export default DetailFilterButton
