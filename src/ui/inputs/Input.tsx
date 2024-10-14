'use client'
import React, { InputHTMLAttributes, useRef, useState } from 'react'
import { InputError, useInputRegister } from '@/features/form/useInputRegister'
import { IMaskInput } from 'react-imask'
import { InputMask } from 'imask'

import { InputValue } from '@/features/form/form.types'

interface IMaskElement {
  maskRef: InputMask | undefined
}

type NotRequiredHTMLInputProps = Partial<Pick<InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'required'>>
type RequiredHTMLInputProps = Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'name'>>

export interface GetInputValueProps {
  inputRef: HTMLInputElement | null
  maskRef: InputMask | undefined
}

type AllowedInputType = 'tel' | 'text' | 'email' | 'password'

type GetInputValueFn<TType extends AllowedInputType> = (props: GetInputValueProps) => InputValue<TType>

// prettier-ignore
export type Props<TType extends AllowedInputType> =
  & NotRequiredHTMLInputProps
  & RequiredHTMLInputProps
  & {
    checked?: boolean
    onDark?: boolean
    className?: string
    type: TType
    mask?: string | RegExp
    getValue?: GetInputValueFn<TType>
  }

function Input<TType extends AllowedInputType>({
  className: labelClassName,
  type,
  onDark,
  checked,
  mask = '',
  getValue,
  ...inputProps
}: Props<TType>) {
  const maskRef = useRef<IMaskElement>(null)
  const [value, setValue] = useState('')
  const { inputRef, error } = useInputRegister(inputProps.name, {
    type,
    getValue() {
      if (getValue) {
        return getValue({
          inputRef: inputRef.current,
          maskRef: maskRef.current?.maskRef,
        })
      }

      const unmaskValue = maskRef.current?.maskRef?.value
      const directValue = inputRef.current?.value
      return unmaskValue || directValue || ''
    },
  })
  const [isPassShow, setIsPassShow] = useState<boolean>(false)

  const onChange = (value: string) => {
    setValue(value)
  }

  function className() {
    return onDark
      ? 'bg-base-115 text-base-100 placeholder:text-base-150'
      : 'bg-base-100 text-base-650 border border-base-400 placeholder:text-base-650'
  }

  function resetButtonHandler() {
    setValue('')
  }

  function passwordEyeHandler() {
    setIsPassShow((prev) => !prev)
  }

  if (inputProps.placeholder && inputProps.required) {
    inputProps.placeholder += '*'
  }

  let buttonIcon = 'bg-icon-close'
  if (type === 'password') {
    buttonIcon = isPassShow ? 'bg-icon-eye' : 'bg-icon-eye-closed'
  }

  return (
    <label className={`relative flex w-full flex-col ${labelClassName}`}>
      <div>
        <IMaskInput
          mask={mask as any}
          value={value}
          ref={maskRef}
          inputRef={inputRef}
          type={isPassShow ? 'text' : type}
          className={`text-base-400-reg-100 w-full rounded-[16px] py-[18px] pl-[14px] pr-[40px] uppercase focus-visible:border-base-600 focus-visible:outline-0 ${className()}`}
          onAccept={onChange}
          {...inputProps}
        />
        <button
          className={`${value ? 'opacity-100' : 'opacity-0'} absolute right-[18px] top-[50%] size-[20px] -translate-y-2/4 border-none ${buttonIcon} bg-icon-close bg-auto bg-center bg-no-repeat ${onDark ? 'filter-base-100' : 'filter-base-600'}`}
          onClick={type !== 'password' ? resetButtonHandler : passwordEyeHandler}
          type='button'
          tabIndex={-1}
        ></button>
      </div>
      <InputError code={error} />
    </label>
  )
}

export default Input
