'use client'

import React, {
  createContext,
  Dispatch,
  FormEvent,
  forwardRef,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  useImperativeHandle,
  useRef,
} from 'react'
import { INPUT_ERRORS_CODES, InputErrorCode } from '@/features/form/useInputRegister'

// prettier-ignore
export type InputType =
  | 'tel'
  | 'email'
  | 'text'
  | 'password'
  | 'toggle'
  | 'range'
  | 'selector'
  | 'file'

// prettier-ignore
export type InputValue<TType extends InputType> =
  TType extends 'text' | 'password'
  ? string
  : TType extends 'file'
  ? FileList
  : TType extends 'selector'
  ? string[]
  : TType extends 'toggle'
  ? boolean
  : TType extends 'range'
  ? [number, number]
  : string

type FormInput = {
  name: string
  /**
   * Устанавливает на поле ошибку.
   * Эффект от установки зависит от функции переданной во время регистрации
   * через [registerInput()]{@link registerInput}
   * */
  setError: Dispatch<SetStateAction<InputErrorCode | null>>
  get required(): boolean
} & (
  | {
      type: 'text' | 'password' | 'tel' | 'email'
      get value(): InputValue<'text' | 'password'>
    }
  | {
      type: 'file'
      get value(): InputValue<'file'>
    }
  | {
      type: 'selector'
      get value(): InputValue<'selector'>
    }
  | {
      type: 'toggle'
      get value(): InputValue<'toggle'>
    }
  | {
      type: 'range'
      get value(): InputValue<'range'>
    }
)

type InputsMap = {
  [Key: string]: FormInput
}

type CustomInputsMap<TMap extends { [key: string]: Pick<FormInput, 'type'> & Partial<Pick<FormInput, 'value'>> }> = {
  [K in keyof TMap]: Pick<FormInput, 'name' | 'setError' | 'required'> & {
    type: TMap[K]['type']
    get value(): InputValue<TMap[K]['type']>
  }
}

export type RegisterInputProps = Pick<FormInput, 'type' | 'setError' | 'required' | 'value'>

interface FormContextObject {
  /**
   * Записывает поле с именем `name` в референсе `inputsRef` компонента {@link Form}.
   * Если поле с `name` уже существует, то перезаписывает его.
   * Нужно вызывать во время рендера поля.
   * @param name - Имя можно использовать для обращения к полю в объектах `inputs` у
   * функций {@link onSubmit} и {@link validator}.
   * @param props
   */
  registerInput: (name: string, props: RegisterInputProps) => void
  /**
   * Убирает из `inputsRef` компонента {@link Form} поле по имени `name`.
   * Если поля с таким именем не существует, то ничего не происходит.
   *
   * Необходимо вызывать при демонтированнии компонента полей.
   * */
  unregisterInput: (name: string) => void
}

export const FormContext = createContext<FormContextObject>({} as FormContextObject)

interface FormImperativeRef {
  /** Вернуть все поля к исходным значениям */
  reset: () => void
  /**
   * Отправить форму программным путем.
   * Эмулирует нажатие пользователя на `submit` кнопку.
   * */
  submit: () => void
}

interface Props extends PropsWithChildren {
  ref?: RefObject<HTMLFormElement>
  /**
   * Вызывается когда пользователь нажимает `submit` кнопку и
   * все `inputs` проходят валидацию через {@link inputsValidator} и {@link validator}
   * @param inputs - Все зарегистрированные поля в форме
   */
  onSubmit?: (inputs: InputsMap) => void
  /**
   * Вызывается при изменении поля в форме.
   * @param input - Поле которое изменилось.
   * */
  onChange?: (input: FormInput) => void
  /**
   * Вызывается во время выполнения {@link inputsValidator} когда пользователь нажимает `submit`.
   * Если функция вернёт `false`, то проверка не пройдет и не вызовется {@link onSubmit}.
   * @param inputs
   */
  validator?: (inputs: FormInput[]) => boolean
  /** Вызывается когда все поля заполнены */
  onCompleteFill?: () => void
  /** Вызывается когда во время заполнения пользователь допустил ошибку. */
  onErrorFill?: () => void
  /** Стили на элементе `form` */
  className?: string
}

/**
 * Выводит форму и добавляет валидацию для полей внутри формы.
 * Хранит в референсе поля зарегистрированные через [registerInput()]{@link registerInput}.
 */
export const Form = forwardRef<FormImperativeRef, Props>(function Form(
  { children, onSubmit, onChange, onCompleteFill, onErrorFill, validator, className }: Props,
  ref,
) {
  const formRef = useRef<HTMLFormElement>(null)
  const inputsRef = useRef<InputsMap>({})

  useImperativeHandle(ref, () => ({
    reset() {
      formRef.current?.reset()
    },
    submit() {
      formRef.current?.requestSubmit(null)
    },
  }))

  function isInputValid(input: FormInput) {
    const result: {
      valid: boolean
      error: null | InputErrorCode
    } = {
      valid: true,
      error: null,
    }

    if (input.required && !input.value) {
      result.valid = false
      result.error = INPUT_ERRORS_CODES.EMPTY
      return result
    }

    if (input.type === 'tel') {
      input.value
    }

    return result
  }

  function allInputsValid() {
    let valid = true

    for (const name in inputsRef.current) {
      const check = isInputValid(inputsRef.current[name])
      if (check.valid) continue

      valid = false
      inputsRef.current[name].setError(check.error)
    }

    if (validator) {
      valid = validator(Object.values(inputsRef.current))
    }

    return valid
  }

  function _onSubmit(e: FormEvent) {
    e.preventDefault()

    if (!allInputsValid()) return

    onSubmit?.(inputsRef.current)
  }

  function _onChange(e: FormEvent) {
    const targetInput = e.target as HTMLInputElement
    if (!inputsRef.current[targetInput.name]) return

    onChange?.(inputsRef.current[targetInput.name])

    if (allInputsValid()) {
      onCompleteFill?.()
    } else {
      onErrorFill?.()
    }
  }

  const registerInput: FormContextObject['registerInput'] = function (name, props) {
    inputsRef.current[name] = {
      ...props,
      /* as any Для фикса ошибки TypeScript. Очередная эквилибристика типами.*/
      type: props.type as any,
      name,
    }
  }

  const unregisterInput: FormContextObject['unregisterInput'] = function (name) {
    if (!inputsRef.current[name]) return

    delete inputsRef.current[name]
  }

  return (
    <FormContext.Provider
      value={{
        registerInput,
        unregisterInput,
      }}
    >
      <form className={className} onSubmit={_onSubmit} onChange={_onChange} ref={formRef}>
        {children}
      </form>
    </FormContext.Provider>
  )
})
