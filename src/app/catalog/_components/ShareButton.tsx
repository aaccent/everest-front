'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const URL = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''
const TEXT = encodeURIComponent('Посмотри этот объект')

function ShareButton({ className, listClassName }: { className: string; listClassName: string }) {
  const [showLinks, setShowLinks] = useState<boolean>(false)

  const telegramLink = `https://telegram.me/share/url?url=${URL}&text=${TEXT}`
  const vkLink = `https://vk.com/share.php?url=?url=${URL}&text=${TEXT}`
  const waLink = `https://wa.me/?text=${TEXT} ${URL}`

  return (
    <div className='relative'>
      <button
        className={`flex size-[42px] items-center justify-center rounded-[16px] border border-base-400 after:size-[16px] after:filter-base-600 after:bg-default md:after:size-[18px] ${className}`}
        type='button'
        onClick={() => setShowLinks((prev) => !prev)}
      />
      <ul
        className={`${listClassName} ${showLinks ? 'visible opacity-100 transition-visibility' : 'invisible opacity-0 transition-visibility'}`}
      >
        <li>
          <button
            className='text-base-500-reg-100-upper md:text-base-400-lg-100'
            type='button'
            onClick={() => {
              if (typeof window === 'undefined') return
              navigator.clipboard.writeText(window.location.href)
            }}
          >
            Скопировать ссылку
          </button>
        </li>
        <li>
          <Link href={vkLink}>Поделиться ВКонтакте</Link>
        </li>
        <li>
          <Link href={telegramLink}>Поделиться в Телеграм</Link>
        </li>
        <li>
          <Link href={waLink}>Поделиться в WhatsApp</Link>
        </li>
      </ul>
    </div>
  )
}

export default ShareButton
