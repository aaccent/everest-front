import React, { useEffect, useState } from 'react'

export type TabButtonItem = { text: string; value: string; disabled?: boolean }

export type TabButtonsProps = {
  list: TabButtonItem[]
  onChange?: (value: string) => void
  defaultActiveValue?: string
}

function TabButtons({ onChange, list, defaultActiveValue }: TabButtonsProps) {
  const [active, setActive] = useState<string>(list[0].value)

  useEffect(() => {
    if (defaultActiveValue) setActive(defaultActiveValue)
  }, [defaultActiveValue])

  function _onChange(value: string) {
    const disabledButtons = list.filter((v) => v.disabled)
    if (disabledButtons.find((v) => v.value === value)) return
    onChange?.(value)
    setActive(value)
  }

  const currentClass = (btn: TabButtonItem) => {
    if (active === btn.value) return 'bg-primary text-base-100'
    if (btn.disabled) return 'bg-base-300 text-base-500 cursor-default'
    return 'bg-base-300 text-base-600'
  }

  function showButtons() {
    return list.map((btn) => {
      return (
        <button
          key={btn.value}
          onClick={() => _onChange(btn.value)}
          className={`text-base-500-reg-100-upper rounded-[50px] px-[14px] py-[9px] ${currentClass(btn)}`}
        >
          {btn.text}
        </button>
      )
    })
  }

  return <div className='flex items-center gap-[8px]'>{showButtons()}</div>
}

export default TabButtons
