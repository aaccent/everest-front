'use client'

import React, { useContext } from 'react'
import { DetailComplex } from '@/types/catalog/Complex'
import { PopupContext } from '@/features/Popup'
import Img from '@/ui/Img'

interface Props {
  complex: DetailComplex
}

function GenPlanButton({ complex }: Props) {
  const { openPopup } = useContext(PopupContext)

  function clickHandler() {
    openPopup({ name: 'gallery', args: { list: [complex.genPlanImg || ''] } })
  }

  return (
    <button
      className='relative flex h-[250px] w-full justify-end overflow-hidden rounded-[24px] bg-base-300 p-[16px] md:h-[220px]'
      type='button'
      onClick={clickHandler}
    >
      <Img src={complex.genPlanImg} fill />
      <span className='relative z-10 flex size-[38px] items-center justify-center rounded-full bg-base-100 after:size-[28px] after:bg-icon-full-screen after:bg-default md:size-[58px] md:after:size-[40px]' />
    </button>
  )
}

export default GenPlanButton
