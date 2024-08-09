'use client'
import React, { ReactNode, useState } from 'react'

interface MoreServicesButtonProps {
  servicesLength: number
  className: string
  children: ReactNode
}

function ServicesWrapperWithButton({ servicesLength, className, children }: MoreServicesButtonProps) {
  const [full, setFull] = useState<boolean>(false)

  const onButtonClick = () => {
    setFull((prev) => !prev)
  }
  return (
    <>
      <div className={`group/services ${full ? 'active' : ''}`}>
        <div className={className}>{children}</div>
      </div>
      <button
        onClick={onButtonClick}
        className='text-base-500-reg-100-upper mt-[16px] flex w-full items-center justify-center rounded-[20px] bg-base-100 py-[18px] text-base-600 md:hidden'
      >
        {full ? 'Свернуть' : `показать ещё ${servicesLength}`}
      </button>
    </>
  )
}

export default ServicesWrapperWithButton
