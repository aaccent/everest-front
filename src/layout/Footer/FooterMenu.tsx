'use client'

import React, { useState } from 'react'
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
  const [opened, setOpened] = useState(() => matchMedia('(min-width: 768px)').matches)

  function className() {
    return opened ? 'visible opacity-100 static' : 'invisible opacity-0 absolute'
  }

  const onTitleClick = () => {
    setOpened((prev) => !prev)
  }

  return (
    <div
      className={`${props.className} relative mt-[18px] pb-[18px] border-b border-b-base-100/10 text-base-100 md:border-none md:mt-0 md:max-w-[246px] md:w-full`}
    >
      <button
        className='flex justify-between w-full text-base-100-reg-100_mobile after:bg-auto after:bg-center after:bg-icon-arrow-fill after:size-[14px] after:block md:text-base-150 md:text-base-100-reg-100_desktop md:after:hidden'
        onClick={onTitleClick}
      >
        {props.title}
      </button>
      <ul
        className={`mt-[18px] flex flex-col gap-[12px] text-base-300-lg-100_mobile md:text-base-300-lg-100_desktop ${className()}`}
      >
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
