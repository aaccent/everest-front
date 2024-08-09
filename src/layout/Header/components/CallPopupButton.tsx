'use client'

import React, { useContext } from 'react'
import { IsDesktop, IsMobile } from '@/features/adaptive'
import { PopupContext } from '@/components/Popup/Popup'

function CallPopupButton() {
  const { openPopup } = useContext(PopupContext)
  return (
    <>
      <IsDesktop>
        <button
          className='text-base-500-reg-100-upper flex items-center gap-[4px] before:size-[17px] before:bg-icon-phone before:filter-base-100 before:bg-default peer-any-parent-[:is(.is-black,.catalog-menu,.sale-menu,.rent-menu)]/style-state:before:filter-primary'
          onClick={() => openPopup('callPopup')}
        >
          заказать звонок
        </button>
      </IsDesktop>
      <IsMobile>
        <button
          className='flex flex-col items-center justify-center gap-[4px] bg-base-115 transition-colors circle-[36px] after:size-[20px] after:bg-icon-phone after:transition-colors after:bg-default peer-any-parent-[:is(.is-scrolled,.menu-open)]/style-state:bg-base-300 peer-any-parent-[:is(.is-scrolled,.menu-open)]/style-state:after:filter-base-600'
          type='button'
          title='Звонок'
          onClick={() => openPopup('callPopup')}
        />
      </IsMobile>
    </>
  )
}

export default CallPopupButton