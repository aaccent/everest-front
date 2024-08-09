import React from 'react'
import { CarouselNavigationButtonNext, CarouselNavigationButtonPrev } from './components/CarouselNavigationButtons'

interface Props {
  className?: string
}

export function CarouselWhiteNavigations({ className }: Props) {
  return (
    <div className={`absolute bottom-[40px] right-[56px] flex gap-[10px] ${className}`}>
      <CarouselNavigationButtonPrev className='flex size-[64px] items-center justify-center rounded-full bg-base-100 after:block after:size-full after:rotate-180 after:bg-icon-arrow after:filter-base-600 after:bg-default-auto' />
      <CarouselNavigationButtonNext className='flex size-[64px] items-center justify-center rounded-full bg-base-100 after:block after:size-full after:bg-icon-arrow after:filter-base-600 after:bg-default-auto' />
    </div>
  )
}

export function CarouselNavigations({ className }: Props) {
  return (
    <>
      <div
        className={`absolute right-0 top-[20px] hidden h-[42px] w-[89px] overflow-hidden rounded-[12px] bg-base-300 md:block ${className}`}
      >
        <div className='relative flex h-full w-full before:absolute before:bottom-0 before:left-[50%] before:h-[8px] before:w-[1px] before:translate-x-1/2 before:bg-base-400 after:absolute after:left-[50%] after:top-0 after:block after:h-[8px] after:w-[1px] after:translate-x-1/2 after:bg-base-400'>
          <CarouselNavigationButtonPrev className='button-prev flex w-1/2 items-center justify-center p-[16px] after:block after:size-full after:rotate-180 after:bg-icon-arrow after:bg-contain after:bg-center after:bg-no-repeat after:filter-base-600' />
          <CarouselNavigationButtonNext className='button-next flex w-1/2 items-center justify-center p-[16px] after:block after:size-full after:bg-icon-arrow after:bg-contain after:bg-center after:bg-no-repeat after:filter-base-600' />
        </div>
      </div>
    </>
  )
}
