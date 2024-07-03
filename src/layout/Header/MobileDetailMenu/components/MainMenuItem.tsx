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

function MainMenuItem({ text, children }: Props) {
  const [active, setActive] = useState(false)
  const { toggleClass } = useStyleState()

  function clickHandler() {
    setActive((prev) => !prev)
    toggleClass('menu-item')
  }

  return (
    <li className='w-full'>
      <button
        className={`py-[18px] w-full text-left text-base-100-reg-100 border-b border-b-base-600/[.1] ${children ? 'flex items-center justify-between after:size-[14px] after:bg-default after:bg-icon-triangle-arrow' : ''}`}
        type='button'
        onClick={clickHandler}
      >
        {text}
      </button>
      {children && (
        <div
          className={`absolute left-0 top-0 pt-[24px] w-full h-full flex flex-col ${active ? 'visible opacity-100' : 'invisible opacity-0'} bg-base-100 transition-[visibility,opacity]`}
        >
          <span className='absolute inset-x-[20px] top-0 h-[1px] bg-base-600/[.1]' />
          <div className='relative mb-[24px] w-full flex items-center justify-center'>
            <button
              className='absolute left-[20px] top-1/2 -translate-y-1/2 -scale-100 size-[24px] bg-default bg-icon-full-arrow filter-base-600 self-start'
              type='button'
              onClick={clickHandler}
              title='Назад'
            />
            <span className='text-base-200-med-100 text-base-600/[.5] uppercase'>{text}</span>
          </div>
          <ul className='px-[20px] pb-[24px] h-1 flex flex-col flex-grow-[1] gap-[8px] overflow-y-auto'>{children}</ul>
        </div>
      )}
    </li>
  )
}

export default MainMenuItem
