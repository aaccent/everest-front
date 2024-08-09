'use client'
import React, { useContext } from 'react'
import { PopupContext } from '@/components/Popup/Popup'

function ClosePopupButton({ className }: { className?: string }) {
  const { closePopup } = useContext(PopupContext)
  return (
    <button
      className={`absolute right-[24px] top-[24px] flex size-[32px] items-center justify-center rounded-full bg-base-400 after:block after:size-[20px] after:bg-icon-close after:bg-default-auto md:right-[56px] md:top-[55px] md:size-[64px] ${className}`}
      onClick={() => {
        closePopup()
      }}
    ></button>
  )
}

export default ClosePopupButton
