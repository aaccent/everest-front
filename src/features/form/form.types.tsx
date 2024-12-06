import { Dispatch, SetStateAction } from 'react'
import { InputErrorCode } from '@/features/form/useInputRegister'

// prettier-ignore
export type InputType = 
  | 'tel' 
  | 'email' 
  | 'text' 
  | 'password' 
  | 'toggle' 
  | 'range' 
  | 'selector'
  | 'radio'
  | 'file'

// prettier-ignore
export type InputValue<TType extends InputType> = 
  TType extends 'text' | 'password' 
  ? string 
  : TType extends 'tel' | 'email' 
  ? { unmasked: string, masked: string } 
  : TType extends 'file' 
  ? FileList 
  : TType extends 'selector' 
  ? string[]
  : TType extends 'radio'
  ? string
  : TType extends 'toggle' 
  ? boolean 
  : TType extends 'range' 
  ? [number, number] 
  : string

export type FormInput = {
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
      type: 'text' | 'password'
      get value(): InputValue<'text' | 'password'>
    }
  | {
      type: 'tel' | 'email'
      get value(): InputValue<'tel' | 'email'>
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
      type: 'radio'
      get value(): InputValue<'radio'>
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

interface CustomInputJSX {
  name: string
  type: InputType
  value?: InputValue<InputType>
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

type CustomInputsMapHelper = { [key: string]: Pick<FormInput, 'type'> & Partial<Pick<FormInput, 'value'>> }
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
export type CustomInputsMap<TMap extends CustomInputsMapHelper | unknown> = TMap extends CustomInputsMapHelper
  ? {
      [K in keyof TMap]: Pick<FormInput, 'name' | 'setError' | 'required'> & {
        type: TMap[K]['type']
        get value(): InputValue<TMap[K]['type']>
      }
    }
  : never

type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never

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
export type ConvertToCustomInputsMap<TInputNames extends CustomInputJSXMap> = CustomInputsMap<
  UnionToIntersection<
    {
      [Key in keyof TInputNames]: {
        [Name in TInputNames[Key]['name']]: TInputNames[Key]['value'] extends undefined | unknown | never
          ? {
              type: TInputNames[Key]['type']
            }
          : {
              type: TInputNames[Key]['type']
              get value(): TInputNames[Key]['value']
            }
      }
    }[keyof TInputNames]
  >
>

export type RegisterInputProps = Pick<FormInput, 'type' | 'setError' | 'required' | 'value' | 'error'>
