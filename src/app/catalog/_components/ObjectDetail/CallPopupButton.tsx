'use client'

import React, { useContext } from 'react'
import Button from '@/ui/buttons/Button'
import { PopupContext } from '@/features/Popup'

function CallPopupButton() {
  const { openPopup } = useContext(PopupContext)
  return (
    <Button
      size='small'
      type='button'
      variation='primary'
      className='h-[50px] w-full max-w-full rounded-[20px] md:h-[42px] md:max-w-[160px] md:rounded-[16px]'
      onClick={() => {
        openPopup({ name: 'callPopup' })
      }}
    >
      Забронировать
    </Button>
  )
}

export default CallPopupButton
