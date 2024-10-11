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
  useState,
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
  get error(): InputErrorCode | null
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

export type InputsMap = {
  [Key: string]: FormInput
}

interface CustomInputJSX<TInputType extends InputType = InputType> {
  name: string
  type: TInputType
  value?: InputValue<TInputType>
}

/**
 * Используется когда имена и типы полей используются в
 * разных местах одного и того же типа формы.
 *
 * Для одной формы имеет смысл использовать в связке с {@link ConvertToCustomInputsMap}.
 *
 * Тип нужно использовать только с `as const` и `satisfies`.
 * ```tsx
 * const FORM_INPUTS = {
 *   PHONE: { name: 'telephone', type: 'tel' },
 * } as const satisfies CustomInputJSX
 *
 * function SomeForm() {
 *    return <form>
 *      <input name={FORM_INPUTS.PHONE.name} type={FORM_INPUTS.PHONE.type} />
 *    </form>
 * }
 * ```
 * @see ConvertToCustomInputsMap
 */
export interface CustomInputJSXMap {
  [index: string]: CustomInputJSX
}

/**
 * Используется в обработчиках форм, которые обернуты в {@link FormContext} с известными именами полей.
 * Тип существует потому что реализовать подобную типизацию внутрь {@link InputsMap} сложнее.
 *
 * ```ts
 * type Inputs = CustomInputsMap<{ phone: { type: 'tel' } }>
 *
 * function formHandler(inputs: InputsMap) {
 *    const _inputs = inputs as unknown as Inputs
 *    console.log(_inputs.phone.value)
 * }
 * ```
 *
 * Если был создан объект с помощью {@link CustomInputJSXMap}, то
 * возможно тебе нужен {@link ConvertToCustomInputsMap}.
 */
export type CustomInputsMap<
  TMap extends { [key: string]: Pick<FormInput, 'type'> & Partial<Pick<FormInput, 'value'>> },
> = {
  [K in keyof TMap]: Pick<FormInput, 'name' | 'setError' | 'required'> & {
    type: TMap[K]['type']
    get value(): InputValue<TMap[K]['type']>
  }
}

/**
 * Используется для конвертирования {@link CustomInputJSXMap} в {@link CustomInputsMap}.
 * Без `CustomInputJSXMap` не имеет смысла.
 *
 * ```ts
 * const FORM_INPUTS = {
 *   PHONE: { name: 'telephone', type: 'tel' },
 * } as const satisfies CustomInputJSX
 *
 * type Inputs = ConvertToCustomInputsMap<typeof FORM_INPUTS>
 *
 * function formHandler(inputs: InputsMap) {
 *    const _inputs = inputs as unknown as Inputs
 *    console.log(_inputs.phone.value)
 * }
 * ```
 */
export type ConvertToCustomInputsMap<TInputNames extends CustomInputJSXMap> = CustomInputsMap<{
  [Key in TInputNames[keyof TInputNames]['name']]: TInputNames[Key]['value'] extends undefined
    ? {
        type: TInputNames[Key]['type']
      }
    : {
        type: TInputNames[Key]['type']
        get value(): TInputNames[Key]['value']
      }
}>

export type RegisterInputProps = Pick<FormInput, 'type' | 'setError' | 'required' | 'value' | 'error'>

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
  get inputsMap(): InputsMap
}

export const FormContext = createContext<FormContextObject>({} as FormContextObject)

export interface FormImperativeRef {
  /** Вернуть все поля к исходным значениям */
  reset: () => void
  /**
   * Отправить форму программным путем.
   * Эмулирует нажатие пользователя на `submit` кнопку.
   * */
  submit: () => void
  get inputs(): InputsMap
}

interface Props extends PropsWithChildren {
  ref?: RefObject<HTMLFormElement>
  /**
   * Вызывается когда пользователь нажимает `submit` кнопку и
   * все `inputs` проходят валидацию через {@link isInputValid} и {@link validator}
   * @param inputs - Все зарегистрированные поля в форме
   */
  onSubmit?: (inputs: InputsMap) => void
  /**
   * Вызывается при изменении поля в форме.
   * @param input - Поле которое изменилось.
   * */
  onChange?: (input: FormInput) => void
  /**
   * Вызывается во время выполнения {@link allInputsValid} когда пользователь нажимает `submit`.
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
  { children, onSubmit, onChange, onCompleteFill, onErrorFill, validator, className },
  ref,
) {
  const formRef = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<boolean>(false)
  const inputsRef = useRef<InputsMap>({})

  useImperativeHandle(ref, () => ({
    reset() {
      formRef.current?.reset()
    },
    submit() {
      formRef.current?.requestSubmit()
    },
    get inputs() {
      return inputsRef.current
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

  /**
   * Проверяет поля с помощью функции {@link isInputValid}.
   * @param onlyCheck - Если `false`, то у полей с ошибками вызывается функция {@link FormInput.setError} и
   * у формы будет выставляться состояние {@link error}.
   */
  function allInputsValid(onlyCheck: boolean = false) {
    let valid = true

    for (const name in inputsRef.current) {
      const input = inputsRef.current[name]
      const check = isInputValid(input)

      if (check.valid && !input.error) {
        input.setError(null)
      }
      if (check.valid) continue

      valid = false
      if (!onlyCheck) {
        input.setError(check.error)
      }
    }

    if (validator) {
      valid = validator(Object.values(inputsRef.current))
    }

    if (!onlyCheck) {
      setError(!valid)
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

    // `!error` - Если в форме есть ошибка, то проверять верно ли введено поле.
    // Если пользователь попробовал отправить форму и получил ошибки на поля,
    // то при вводе у полей при вводе будут автоматически пропадать ошибки
    if (allInputsValid(!error)) {
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
      get value() {
        return props.value
      },
      get required() {
        return props.required
      },
      get error() {
        return props.error
      },
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
        get inputsMap() {
          return inputsRef.current
        },
      }}
    >
      <form className={className} onSubmit={_onSubmit} onChange={_onChange} ref={formRef} noValidate>
        {children}
      </form>
    </FormContext.Provider>
  )
})
