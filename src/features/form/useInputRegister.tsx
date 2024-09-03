'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { FormContext, InputType, InputValue } from '@/features/form/form'

export const INPUT_ERRORS_CODES = {
  EMPTY: 'not_filled',
  UNEXPECTED: 'unexpected',
} as const

export type InputErrorCode = (typeof INPUT_ERRORS_CODES)[keyof typeof INPUT_ERRORS_CODES]

const INPUT_ERROR_TEXTS = {
  [INPUT_ERRORS_CODES.EMPTY]: 'Поле обязательно для заполнения',
  [INPUT_ERRORS_CODES.UNEXPECTED]: 'Неожиданная ошибка',
} as const satisfies {
  [Key in InputErrorCode]: string
}

interface InputErrorProps {
  code: InputErrorCode | null
}

export function InputError({ code }: InputErrorProps) {
  if (!code) return null

  const unexpected = INPUT_ERROR_TEXTS[INPUT_ERRORS_CODES.UNEXPECTED]
  return <div className='text-system-red'>{INPUT_ERROR_TEXTS[code] || unexpected}</div>
}

type InputRegisterProps<TInputType extends InputType = InputType> = {
  type: TInputType
  getValue?: () => InputValue<TInputType>
}

/**
 * Регистрирует поле в [контексте формы]{@link Form}.
 * Если контекста нет или в `name` пустая строка, то регистрация пропускается.
 */
export function useInputRegister(name: string, props: InputRegisterProps) {
  const { registerInput, unregisterInput } = useContext(FormContext)
  const [error, setError] = useState<InputErrorCode | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!registerInput || !name) return

    registerInput(name, {
      get value() {
        if (props.getValue) {
          return props.getValue()
        }

        return inputRef.current?.value || ''
      },
      get required() {
        return inputRef.current?.required || false
      },
      setError,
      type: props.type,
    })

    return () => unregisterInput(name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { inputRef, error }
}
