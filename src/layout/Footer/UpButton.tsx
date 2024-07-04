'use client'
import React from 'react'

function UpButton() {
  const onUpBtnClick = () => {
    scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      className='hidden md:mr-[323px] md:flex gap-[5px] items-center text-base-500-reg-100-upper text-base-100 uppercase after:block after:size-[16px] after:bg-center after:bg-auto after:bg-icon-arrow-up after:bg-no-repeat'
      onClick={onUpBtnClick}
    >
      наверх
    </button>
  )
}

export default UpButton
