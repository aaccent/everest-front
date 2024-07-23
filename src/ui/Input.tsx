'use client'
import React, { InputHTMLAttributes, useRef, useState } from 'react'

type HTMLInputProps = Pick<InputHTMLAttributes<HTMLInputElement>, 'type' | 'name' | 'placeholder' | 'value'>

type Props = HTMLInputProps & {
  checked?: boolean
  onDark?: boolean
  className?: string
}

function Input({ className: labelClassName, type, onDark, checked, ...inputProps }: Props) {
  const [resetBtnCLass, setResetBtnClass] = useState<string>('hidden')
  const passwordState = {
    icon: 'bg-icon-eye-closed',
    type: type,
  }
  const [showPassword, setShowPassword] = useState(passwordState)
  const inputRef = useRef<HTMLInputElement>(null)

  function className() {
    return onDark ? 'bg-base-115' : 'bg-base-100 border border-base-400'
  }

  function checkedClassName() {
    return checked ? 'text-system-green border-system-green after:filter-system-green' : null
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value.length ? setResetBtnClass('block') : setResetBtnClass('hidden')
  }

  const onResetBtnClick = () => {
    inputRef.current ? (inputRef.current.value = '') : null
    setResetBtnClass('hidden')
  }

  function Icon() {
    return checked ? (
      <div
        className={`absolute right-[18px] top-[50%] block size-[20px] -translate-y-2/4 border-none bg-icon-checkmark bg-auto bg-center bg-no-repeat`}
      ></div>
    ) : type === 'password' ? (
      <button
        className={`absolute right-[18px] top-[50%] block size-[20px] -translate-y-2/4 ${showPassword.icon} border-none bg-auto bg-center bg-no-repeat opacity-50`}
        onClick={onEyeClick}
      ></button>
    ) : (
      <button
        className={`${resetBtnCLass} absolute right-[18px] top-[50%] size-[20px] -translate-y-2/4 border-none bg-icon-close bg-auto bg-center bg-no-repeat`}
        onClick={onResetBtnClick}
      ></button>
    )
  }

  const onEyeClick = () => {
    showPassword.type === 'password'
      ? setShowPassword({
          icon: 'bg-icon-eye',
          type: 'text',
        })
      : setShowPassword(passwordState)
  }
  return (
    <label className={`relative block w-full ${labelClassName}`}>
      <input
        ref={inputRef}
        type={showPassword.type}
        className={`text-base-400-reg-100 w-full rounded-[16px] py-[18px] pl-[14px] pr-[40px] uppercase text-base-650 placeholder:text-base-150 focus-visible:border-base-600 focus-visible:outline-0 ${checkedClassName()} ${className()}`}
        onChange={type !== 'password' ? onChange : undefined}
        {...inputProps}
      />
      {Icon()}
    </label>
  )
}

export default Input
