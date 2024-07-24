'use client'
import React, { useContext } from 'react'
import { PopupContext } from '@/components/Popup/Popup'

function ClosePopupButton({ className }: { className?: string }) {
  const { closePopup } = useContext(PopupContext)
  return (
    <button
      className={`absolute right-[24px] top-[24px] size-[32px] rounded-full bg-base-400 md:right-[56px] md:top-[55px] md:size-[64px] ${className}`}
      onClick={closePopup}
    ></button>
  )
}

export default ClosePopupButton
