import React from 'react'
import Link from 'next/link'
import CallPopupButton from '@/layout/Header/components/CallPopupButton'
import CityButton from '@/layout/Header/desktop/CityButton'

interface Props {
  className?: string
}

function HeaderTop({ className }: Props) {
  return (
    <div className={`items-center justify-between border-b border-b-base-100/15 pb-[13px] ${className}`}>
      <nav>
        <ul className='text-base-500-reg-200 flex items-center gap-[14px] opacity-50 peer-any-parent-[.is-black]/header-state:text-base-650 peer-any-parent-[.is-black]/header-state:opacity-100'>
          <li>
            <button>Сервисы</button>
          </li>
          <li>
            <Link href='#'>Отзывы</Link>
          </li>
          <li>
            <Link href='#'>Trade-in</Link>
          </li>
        </ul>
      </nav>
      <div className='flex items-center gap-[24px] peer-any-parent-[.is-black]/header-state:text-primary'>
        <CityButton />
        <button className='text-base-500-reg-100-upper flex items-center gap-[4px] before:size-[17px] before:bg-icon-add before:filter-base-100 before:bg-default peer-any-parent-[.is-black]/header-state:before:filter-primary'>
          добавить объявление
        </button>
        <CallPopupButton />
      </div>
    </div>
  )
}

export default HeaderTop
