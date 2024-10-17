'use client'
import React, { useState } from 'react'

type TabButtonsProps = {
  list: { text: string; value: string }[]
  onChange?: (value: string) => void
  defaultActiveValue?: string
}

function TabButtons({ onChange, list, defaultActiveValue }: TabButtonsProps) {
  const [active, setActive] = useState<string>(defaultActiveValue || list[0].value)

  function _onChange(value: string) {
    onChange?.(value)
    setActive(value)
  }

  function showButtons() {
    return list.map((btn) => {
      return (
        <button
          key={btn.value}
          onClick={() => _onChange(btn.value)}
          className={`text-base-500-reg-100-upper rounded-[50px] px-[14px] py-[9px] ${active === btn.value ? 'bg-primary text-base-100' : 'bg-base-300 text-base-600'}`}
        >
          {btn.text}
        </button>
      )
    })
  }

  return <div className='flex items-center gap-[8px]'>{showButtons()}</div>
}

export default TabButtons
