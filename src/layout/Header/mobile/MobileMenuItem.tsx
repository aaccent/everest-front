'use client'

import React, { PropsWithChildren, useState } from 'react'
import { useStyleState } from '@/features/styleStates'

type Props = {
  text: string
} & (
  | {
      children?: undefined
      href: string
    }
  | {
      children: PropsWithChildren['children']
      href?: undefined
    }
)

function MobileMenuItem({ text, children }: Props) {
  const [active, setActive] = useState(false)
  const { toggleClass } = useStyleState()

  function clickHandler() {
    setActive((prev) => !prev)
    toggleClass('menu-item')
  }

  return (
    <li className='w-full'>
      <button
        className={`text-base-100-reg-100 w-full border-b border-b-base-600/10 py-[18px] text-left ${children ? 'flex items-center justify-between after:size-[14px] after:bg-icon-triangle-arrow after:bg-default' : ''}`}
        type='button'
        onClick={clickHandler}
      >
        {text}
      </button>
      {children && (
        <div
          className={`absolute left-0 top-0 flex h-full w-full flex-col pt-[24px] ${active ? 'visible opacity-100' : 'invisible opacity-0'} bg-base-100 transition-opacity`}
        >
          <span className='absolute inset-x-[20px] top-0 h-[1px] bg-base-600/10' />
          <div className='relative mb-[24px] flex w-full items-center justify-center'>
            <button
              className='absolute left-[20px] top-1/2 size-[24px] -translate-y-1/2 -scale-100 self-start bg-icon-full-arrow filter-base-600 bg-default'
              type='button'
              onClick={clickHandler}
              title='Назад'
            />
            <span className='text-base-200-med-100 uppercase text-base-600/50'>{text}</span>
          </div>
          <ul className='px-container flex h-1 flex-grow-[1] flex-col gap-[8px] overflow-y-auto pb-[24px]'>
            {children}
          </ul>
        </div>
      )}
    </li>
  )
}

export default MobileMenuItem