'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface FooterMenuItem {
  id: string
  title: string
  icon?: string
  code: string
  showOnMain?: boolean
  showInFooter?: boolean
}

interface Props {
  list: FooterMenuItem[]
  title: string
  className?: string
}

function FooterMenu(props: Props) {
  const [opened, setOpened] = useState(true)

  function className() {
    return opened ? 'visible opacity-100 static' : 'invisible opacity-0 absolute'
  }

  const onTitleClick = () => {
    setOpened((prev) => !prev)
  }

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      setOpened(false)
    }
  }, [])

  return (
    <div
      className={`${props.className} relative mt-[18px] border-b border-b-base-100/10 pb-[18px] text-base-100 md:mt-0 md:w-full md:max-w-[246px] md:border-none`}
    >
      <button
        className='text-base-100-reg-100 flex w-full justify-between after:block after:size-[14px] after:bg-icon-arrow-fill after:bg-auto after:bg-center md:text-base-150 md:after:hidden'
        onClick={onTitleClick}
      >
        {props.title}
      </button>
      <ul className={`text-base-300-lg-100 mt-[18px] flex flex-col gap-[12px] ${className()}`}>
        {props.list.map((item) => (
          <Link href={item.code} key={item.id}>
            <li>{item.title}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default FooterMenu
