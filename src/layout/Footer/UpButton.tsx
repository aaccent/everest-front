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
      className='text-base-500-reg-100-upper hidden items-center gap-[5px] uppercase text-base-100 after:block after:size-[16px] after:bg-icon-arrow-up after:bg-auto after:bg-center after:bg-no-repeat md:mr-[323px] md:flex'
      onClick={onUpBtnClick}
    >
      наверх
    </button>
  )
}

export default UpButton
