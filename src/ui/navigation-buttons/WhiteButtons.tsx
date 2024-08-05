import React from 'react'
import { NavigationButtonsProps } from '@/ui/navigation-buttons/GrayButtons'

function WhiteButtons({ scrollNext, scrollPrev, className }: NavigationButtonsProps) {
  return (
    <div className={`absolute bottom-[40px] right-[56px] flex gap-[10px] ${className}`}>
      <button
        className='flex size-[64px] items-center justify-center rounded-full bg-base-100 after:block after:size-full after:rotate-180 after:bg-icon-arrow after:filter-base-600 after:bg-default-auto'
        onClick={scrollPrev}
      ></button>
      <button
        className='flex size-[64px] items-center justify-center rounded-full bg-base-100 after:block after:size-full after:bg-icon-arrow after:filter-base-600 after:bg-default-auto'
        onClick={scrollNext}
      ></button>
    </div>
  )
}

export default WhiteButtons
