'use client'

import React, { useContext } from 'react'
import { PopupContext } from '@/components/Popup/Popup'

interface Props {
  className?: string
}

function DetailFilterButton({ className }: Props) {
  const { openPopup } = useContext(PopupContext)
  return (
    <button
      className={`${className} flex size-[42px] items-center justify-center rounded-[12px] bg-base-100 p-[10px] after:size-[21px] after:bg-icon-filter after:bg-default`}
      type='button'
      onClick={() => openPopup('filterPopup')}
    />
  )
}

export default DetailFilterButton
