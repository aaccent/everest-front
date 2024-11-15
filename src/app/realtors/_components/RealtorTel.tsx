'use client'

import React, { useState } from 'react'
import Link from 'next/link'

function RealtorTel({ tel }: { tel: string }) {
  const [telShown, setTelShown] = useState<boolean>(false)

  const onClickHandle = () => setTelShown(true)
  return (
    <button
      onClick={onClickHandle}
      className='text-base-500-reg-100-upper absolute bottom-[24px] left-1/2 flex -translate-x-1/2 justify-center rounded-[20px] bg-base-100 py-[17px] pl-[18px] pr-[24px] before:block before:size-[16px] before:bg-icon-phone before:filter-base-600 before:bg-default-auto md:py-[12px] md:pl-[15px] md:pr-[21px]'
    >
      {telShown ? (
        <Link href={`tel:${tel}`} className=''>
          {tel}
        </Link>
      ) : (
        <span>Показать телефон</span>
      )}
    </button>
  )
}

export default RealtorTel
