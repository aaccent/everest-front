'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { cookies, ONE_MONTH, setCookie } from '@/features/utility/cookies'

function CookieNotification() {
  const [active, setActive] = useState<boolean>(false)

  useEffect(() => {
    if (cookies()?.get('notification')) return
    setActive(true)
  }, [])

  const onClickHandle = () => {
    setCookie('notification', 'true', { maxAge: ONE_MONTH, path: '/' })
    setActive(false)
  }

  return (
    <div
      className={`${active ? 'flex' : 'hidden'} text-base-300-lg-100 sticky bottom-[20px] left-[20px] z-50 w-[350px] flex-col gap-[20px] rounded-[24px] bg-base-650 px-[24px] py-[24px] text-base-100 backdrop-blur-[12px] md:inset-x-1/2 md:bottom-[32px] md:w-[433px] md:-translate-x-1/2 md:flex-row md:py-[26px]`}
    >
      <div>
        Мы используем Яндекс.метрика и сохраняем{' '}
        <Link href='' className='text-base-100 opacity-50'>
          файлы cookies
        </Link>
      </div>
      <button
        className='text-base-500-reg-100-upper rounded-[16px] bg-base-100 px-[40px] py-[12px] text-base-600'
        onClick={onClickHandle}
      >
        ок
      </button>
    </div>
  )
}

export default CookieNotification
