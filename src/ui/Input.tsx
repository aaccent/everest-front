'use client'
import React, { useRef, useState } from 'react'

interface InputProps {
  type: 'text' | 'tel' | 'password'
  checked?: boolean
  onDark?: boolean
  className?: string
  placeholder: string
  value?: string
}

function Input(props: InputProps) {
  const [resetBtnCLass, setResetBtnClass] = useState<string>('hidden')
  const passwordState = {
    icon: 'bg-icon-eye-closed',
    type: props.type,
  }
  const [showPassword, setShowPassword] = useState(passwordState)
  const inputRef = useRef<HTMLInputElement>(null)

  function className() {
    return props.onDark ? 'bg-base-115' : 'bg-base-100 border border-base-400'
  }

  function checkedClassName() {
    return props.checked ? 'text-system-green border-system-green after:filter-system-green' : null
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.length ? setResetBtnClass('block') : setResetBtnClass('hidden')
  }

  const onResetBtnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    inputRef.current ? (inputRef.current.value = '') : null
    setResetBtnClass('hidden')
  }

  function Icon() {
    return props.checked ? (
      <div
        className={`absolute right-[18px] top-[50%] -translate-y-2/4 block size-[20px] bg-icon-checkmark bg-auto bg-no-repeat bg-center border-none`}
      ></div>
    ) : props.type === 'password' ? (
      <button
        className={`absolute right-[18px] top-[50%] -translate-y-2/4 block size-[20px] ${showPassword.icon} bg-auto bg-no-repeat bg-center border-none opacity-50`}
        onClick={onEyeClick}
      ></button>
    ) : (
      <button
        className={`${resetBtnCLass} absolute right-[18px] top-[50%] -translate-y-2/4 size-[20px] bg-icon-close bg-auto bg-no-repeat bg-center border-none`}
        onClick={onResetBtnClick}
      ></button>
    )
  }

  const onEyeClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    showPassword.type === 'password'
      ? setShowPassword({
          icon: 'bg-icon-eye',
          type: 'text',
        })
      : setShowPassword(passwordState)
  }
  return (
    <label className={`relative block w-full ${props.className}`}>
      <input
        type={showPassword.type}
        className={`py-[18px] pl-[14px] pr-[40px] w-full rounded-[16px] text-base-650 uppercase focus-visible:border-base-600 focus-visible:outline-0 placeholder:text-base-150 text-base-400-reg-100 ${checkedClassName()} ${className()}`}
        placeholder={`${props.placeholder}`}
        onChange={props.type !== 'password' ? onChange : undefined}
        ref={inputRef}
        disabled={props.checked}
        value={props.value}
      />
      {Icon()}
    </label>
  )
}

export default Input
