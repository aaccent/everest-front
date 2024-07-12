'use client'
import React, { useState } from 'react'
import { showServices } from '@/components/Services/Services'

interface Service {
  id: string
  title: string
  code: string
  icon: string
}

interface MoreServicesButtonProps {
  hiddenServices: Service[]
}

function MoreServicesButton({ hiddenServices }: MoreServicesButtonProps) {
  const [full, setFull] = useState<boolean>(false)

  const onButtonClick = () => {
    setFull((prev) => !prev)
  }
  return (
    <>
      {full ? showServices(hiddenServices) : null}
      <button
        onClick={onButtonClick}
        className={`text-base-500-reg-100-upper mt-[16px] flex w-full items-center justify-center rounded-[20px] bg-base-100 py-[18px] text-base-600`}
      >
        {full ? 'Свернуть' : `показать ещё ${hiddenServices.length}`}
      </button>
    </>
  )
}

export default MoreServicesButton
