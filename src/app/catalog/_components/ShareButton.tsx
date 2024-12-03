'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const SHARE_OPTIONS = [
  { id: 'copy', text: 'Скопировать ссылку' },
  { id: 'vk', text: 'Поделиться ВКонтакте', link: 'https://vk.com/share.php?url=' },
  { id: 'tg', text: 'Поделиться в Телеграм', link: 'https://telegram.me/share/url' },
  { id: 'wa', text: 'Поделиться в WhatsApp', link: 'https://wa.me/?text=' },
]

const URL = encodeURIComponent(window.location.href)
const TEXT = encodeURIComponent('Посмотри этот объект')

function ShareButton({ className, listClassName }: { className: string; listClassName: string }) {
  const [showLinks, setShowLinks] = useState<boolean>(false)
  function generateShareLinks() {
    return SHARE_OPTIONS.map((option) => {
      let link = ''
      switch (option.id) {
        case 'copy':
          return (
            <Link
              href=''
              key={option.id}
              type='button'
              onClick={(e) => {
                e.preventDefault()
                navigator.clipboard.writeText(window.location.href)
              }}
            >
              {option.text}
            </Link>
          )
        case 'tg':
          link += option.link + `?url=${URL}&text=${TEXT}`
          return (
            <Link key={option.id} href={link}>
              {option.text}
            </Link>
          )
        case 'vk':
          link += option.link + URL
          return (
            <Link key={option.id} href={link}>
              {option.text}
            </Link>
          )
        default:
          link = option.link + TEXT + URL
          return (
            <Link key={option.id} href={link}>
              {option.text}
            </Link>
          )
      }
    })
  }

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
        {generateShareLinks()}
      </ul>
    </div>
  )
}

export default ShareButton
