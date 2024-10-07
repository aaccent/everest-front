'use client'
import React, { useState } from 'react'
import { InputCheckboxValue } from '@/globals/utilityTypes'

export type CheckboxProps = {
  name: string
  changeMobileView?: boolean
  title: string
  value: string
  defaultChecked?: boolean
} & InputCheckboxValue

function Checkbox({
  changeMobileView = false,
  title,
  name,
  defaultChecked = false,
  checked: customChecked,
  onChange,
  value,
}: CheckboxProps) {
  const [checked, setChecked] = useState<boolean>(defaultChecked)

  const hasCustomValue = customChecked !== undefined
  const _checked = hasCustomValue ? customChecked : checked
  const _setValue = (changeFn: (prev: boolean) => boolean) => {
    if (hasCustomValue) {
      onChange(value, changeFn(_checked))
    } else {
      setChecked((prev) => {
        const newValue = changeFn(prev)
        onChange?.(value, newValue)
        return newValue
      })
    }
  }

  function changeHandle() {
    _setValue((prev) => !prev)
  }

  return changeMobileView ? (
    <label className='text-base-100-reg-100 md:text-base-500-reg-100-upper flex cursor-pointer items-center justify-between py-[16px] md:gap-[10px] md:py-0'>
      <div className='relative order-2 flex h-[22px] w-[36px] items-center justify-center rounded-[50px] bg-base-300 after:absolute after:inset-y-1/2 after:left-[6px] after:right-auto after:block after:size-[10px] after:-translate-y-1/2 after:rounded-full after:bg-base-500 has-[:checked]:after:left-auto has-[:checked]:after:right-[6px] has-[:checked]:after:bg-primary md:static md:order-1 md:size-[20px] md:rounded-[4px] md:after:static md:after:rounded-none md:after:bg-transparent md:after:bg-default-contain md:has-[:checked]:bg-primary md:has-[:checked]:after:size-[12px] md:has-[:checked]:after:translate-y-0 md:has-[:checked]:after:bg-transparent md:has-[:checked]:after:bg-icon-checkmark md:has-[:checked]:after:filter-base-100'>
        <input type='checkbox' className='absolute -z-10 opacity-0' checked={_checked} onChange={changeHandle} />
      </div>
      {title}
    </label>
  ) : (
    <label className='text-base-500-reg-100-upper flex cursor-pointer items-center gap-[10px]'>
      <div className='flex h-[20px] w-full max-w-[20px] items-center justify-center rounded-[4px] bg-base-300 after:bg-icon-checkmark after:filter-base-100 after:bg-default-contain has-[:checked]:bg-primary has-[:checked]:after:block has-[:checked]:after:size-[12px]'>
        <input
          type='checkbox'
          className='absolute -z-10 opacity-0'
          name={name}
          value={value}
          checked={_checked}
          onChange={changeHandle}
        />
      </div>
      {title}
    </label>
  )
}

export default Checkbox
