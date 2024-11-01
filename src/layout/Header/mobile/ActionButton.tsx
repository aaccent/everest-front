'use client'

import { IconName, ICONS_NAME } from '@/globals/icons/icons'
import Link from 'next/link'
import React, { useContext } from 'react'
import { CityContext } from '@/globals/CityContext'
import { PopupContext } from '@/features/Popup'

interface Props {
  text: string
  href?: string
  icon: IconName
  accentColor?: boolean
  onClick?: () => void
}

export function ActionButton({ accentColor, text, href, icon, onClick }: Props) {
  const inner = (
    <div
      className={`flex h-[115px] flex-col justify-between gap-[10px] rounded-[20px] p-[16px] ${accentColor ? 'bg-primary text-base-100' : 'bg-base-300'}`}
    >
      <span className='text-base-300-reg-200 block max-w-[93px] text-left'>{text}</span>
      <span
        className={`flex items-center justify-center self-end bg-base-100 circle-[40px] after:size-[21px] ${accentColor ? 'after:filter-primary' : 'after:filter-base-600'} after:bg-default after:bg-${ICONS_NAME[icon]}`}
      />
    </div>
  )

  return href ? (
    <Link href={href}>{inner}</Link>
  ) : (
    <button type='button' onClick={onClick}>
      {inner}
    </button>
  )
}

export function MobileCallPopupButton() {
  const { openPopup } = useContext(PopupContext)

  function clickHandler() {
    openPopup({
      name: 'callPopup',
    })
  }

  return <ActionButton text='Заказать звонок' icon='PHONE' accentColor onClick={clickHandler} />
}

export function MobileCityButton() {
  const { currentCity } = useContext(CityContext)
  const { openPopup } = useContext(PopupContext)

  function clickHandler() {
    openPopup({
      name: 'geoPopup',
    })
  }

  const text = `г.${currentCity?.name || 'Абакан'}`

  return <ActionButton text={text} icon='LOCATION' onClick={clickHandler} />
}
