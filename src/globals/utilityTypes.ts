export type InputValue<TType extends any> =
  | {
      value?: TType
      onChange: (name: string, value: TType) => void
    }
  | {
      value: TType
      onChange: (name: string, value: TType) => void
    }
  | {
      value?: never
      onChange?: never
    }

export type CheckboxChangeFn = (value: string, checked: boolean) => void

export type InputCheckboxValue =
  | {
      checked?: boolean
      onChange: CheckboxChangeFn
    }
  | {
      checked: boolean
      onChange: CheckboxChangeFn
    }
  | {
      checked?: never
      onChange?: never
    }
