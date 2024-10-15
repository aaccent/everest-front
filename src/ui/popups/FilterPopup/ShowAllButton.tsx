'use client'

import React, { useContext } from 'react'
import Button from '@/ui/buttons/Button'
import { PopupContext } from '@/features/Popup'

function ShowAllButton({ amount }: { amount: number }) {
  const { closePopup } = useContext(PopupContext)
  return amount ? (
    <Button
      variation='primary'
      size='small'
      text={`Показать ${amount} объектов`}
      className='md:mr-[12px]'
      onClick={() => closePopup()}
    />
  ) : null
}

export default ShowAllButton
