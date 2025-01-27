'use client'

import React, { useContext } from 'react'
import { IsDesktop, IsMobile } from '@/features/adaptive'
import { PopupContext } from '@/features/Popup'

function CallPopupButton() {
  const { openPopup } = useContext(PopupContext)

  function clickHandler() {
    openPopup({ name: 'call' })
  }

  return (
    <>
      <IsDesktop>
        <button
          className='text-base-500-reg-100-upper flex items-center gap-[4px] before:size-[17px] before:bg-icon-phone before:filter-base-100 before:bg-default peer-any-parent-[:is([data-is-inner],[data-menu])]/header-state:before:filter-primary'
          onClick={clickHandler}
        >
          заказать звонок
        </button>
      </IsDesktop>
      <IsMobile>
        <button
          className='flex flex-col items-center justify-center gap-[4px] bg-base-115 transition-colors circle-[36px] after:size-[20px] after:bg-icon-phone after:transition-colors after:bg-default peer-any-parent-[.is-black]/header-state:bg-base-300 peer-any-parent-[.is-black]/header-state:after:filter-base-600'
          type='button'
          title='Звонок'
          onClick={clickHandler}
        />
      </IsMobile>
    </>
  )
}

export default CallPopupButton
