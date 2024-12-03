import React, { PropsWithChildren } from 'react'
import ClosePopupButton from '@/ui/buttons/ClosePopupButton'
import { PopupTemplate } from '@/layout/popups/PopupTemplate'

interface Props extends PropsWithChildren {
  className?: string
}

export function CenteredPopup({ className, children }: Props) {
  return (
    <PopupTemplate>
      <div className='flex h-full w-full'>
        <div
          className={`relative mt-auto h-fit w-full rounded-t-[24px] bg-base-100 p-[24px] pb-[32px] md:m-auto md:w-fit md:rounded-[24px] md:p-[40px] md:pt-[32px] ${className}`}
        >
          {children}
          <ClosePopupButton className='hidden md:absolute md:left-[calc(100%+16px)] md:top-0 md:flex md:bg-base-100/15 md:after:filter-base-100' />
        </div>
      </div>
    </PopupTemplate>
  )
}
