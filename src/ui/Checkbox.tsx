'use client'
import React, { useState } from 'react'

interface CheckboxProps {
  text?: string
}

function Checkbox({ text }: CheckboxProps) {
  const [checked, setChecked] = useState(false)

  const checkedClasses = () =>
    checked
      ? 'bg-primary after:block after:size-[12px] after:bg-icon-checkmark after:filter-base-100 after:bg-default-contain'
      : ''

  return (
    <div className='flex cursor-pointer items-center gap-[10px]' onClick={() => setChecked((prev) => !prev)}>
      <div className={`flex size-[20px] items-center justify-center rounded-[4px] bg-base-300 ${checkedClasses()}`} />
      <div>{text}</div>
    </div>
  )
}

export default Checkbox
