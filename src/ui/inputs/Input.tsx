'use client'
import React, { InputHTMLAttributes, useState } from 'react'
import { InputError, useInputRegister } from '@/features/form/useInputRegister'

type NotRequiredHTMLInputProps = Partial<
  Pick<InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'value' | 'required'>
>
type RequiredHTMLInputProps = Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'name'>>

type Props = NotRequiredHTMLInputProps &
  RequiredHTMLInputProps & {
    checked?: boolean
    onDark?: boolean
    className?: string
    type: 'tel' | 'text' | 'email' | 'password'
  }

function Input({ className: labelClassName, type = 'text', onDark, checked, ...inputProps }: Props) {
  const { inputRef, error } = useInputRegister(inputProps.name, { type })

  const [resetBtnCLass, setResetBtnClass] = useState<string>('hidden')
  const passwordState = {
    icon: 'bg-icon-eye-closed',
    type: type,
  }
  const [showPassword, setShowPassword] = useState(passwordState)

  function className() {
    return onDark
      ? 'bg-base-115  placeholder:text-base-150'
      : 'bg-base-100 border border-base-400 placeholder:text-base-650'
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

  const onEyeClick = () => {
    showPassword.type === 'password'
      ? setShowPassword({
          icon: 'bg-icon-eye',
          type: 'text',
        })
      : setShowPassword(passwordState)
  }

  function Icon() {
    return checked ? (
      <div className='absolute right-[18px] top-[50%] block size-[20px] -translate-y-2/4 border-none bg-icon-checkmark bg-auto bg-center bg-no-repeat'></div>
    ) : type === 'password' ? (
      <button
        className={`absolute right-[18px] top-[50%] block size-[20px] -translate-y-2/4 ${showPassword.icon} border-none bg-auto bg-center bg-no-repeat opacity-50`}
        onClick={onEyeClick}
        type='button'
        tabIndex={-1}
      ></button>
    ) : (
      <button
        className={`${resetBtnCLass} absolute right-[18px] top-[50%] size-[20px] -translate-y-2/4 border-none bg-icon-close bg-auto bg-center bg-no-repeat`}
        onClick={onResetBtnClick}
        type='button'
        tabIndex={-1}
      ></button>
    )
  }

  return (
    <label className={`relative flex w-full flex-col ${labelClassName}`}>
      <div>
        <input
          ref={inputRef}
          type={showPassword.type}
          className={`text-base-400-reg-100 w-full rounded-[16px] py-[18px] pl-[14px] pr-[40px] uppercase text-base-650 placeholder:text-base-150 focus-visible:border-base-600 focus-visible:outline-0 ${checkedClassName()} ${className()}`}
          onChange={type !== 'password' ? onChange : undefined}
          {...inputProps}
        />
        {Icon()}
      </div>
      <InputError code={error} />
    </label>
  )
}

export default Input
