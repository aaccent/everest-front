'use client'
import React, { useState } from 'react'
import Checkbox from '@/ui/inputs/Checkbox'
import Radio from '@/ui/inputs/Radio'
import { CheckboxChangeFn, InputValue } from '@/globals/utilityTypes'

export type SelectorValue = Array<string | number>

export type Props = {
  name: string
  title: string
  showTitle: boolean
  /**
   * Если `true`, то может быть активно только одно значение,
   * иначе можно выбрать несколько.
   * @default false
   * */
  isRadio?: boolean
  list: SelectorValue
  /** @default [] */
  defaultValue?: SelectorValue
  className?: string
} & InputValue<SelectorValue>

function Selector({
  list,
  isRadio,
  showTitle,
  title,
  name,
  className,
  defaultValue = [],
  value: customValue,
  onChange,
}: Props) {
  const [opened, setOpened] = useState(false)
  const [value, setValue] = useState<SelectorValue>(defaultValue)

  const _value = customValue || value
  const maxStringSize = 15

  function _setValue(changeFn: (prev: SelectorValue) => SelectorValue) {
    if (customValue) {
      onChange?.(name, changeFn(_value))
    } else {
      setValue((prev) => {
        const newValue = changeFn(prev)
        onChange?.(name, newValue)
        return newValue
      })
    }
  }

  const onCheckboxChanged: CheckboxChangeFn = (value, checked) => {
    _setValue((prev) => {
      const valueSet = new Set(prev)

      if (checked) {
        valueSet.add(value)
      } else {
        valueSet.delete(value)
      }

      return Array.from(valueSet)
    })
  }

  function onRadioClick(item: string) {
    _setValue((prev) => {
      if (prev.includes(item)) return prev

      return [item]
    })
  }

  function showList() {
    return list?.map((itemValue, index) => {
      const props = {
        name,
        title: itemValue.toString(),
        value: itemValue.toString(),
        checked: _value.includes(itemValue),
      }

      return isRadio ? (
        <Radio key={index} onClick={onRadioClick} {...props} />
      ) : (
        <Checkbox key={index} defaultChecked={_value.includes(itemValue)} onChange={onCheckboxChanged} {...props} />
      )
    })
  }

  function showSelected() {
    const defaultValue = window.matchMedia('(min-width:768px').matches ? 'Выбрать' : title
    const selectedNames = _value.length ? _value.join(', ') : defaultValue

    if (selectedNames.length > maxStringSize) return selectedNames.slice(0, maxStringSize) + `...`

    return selectedNames
  }

  return (
    <div className='flex flex-col gap-[8px]'>
      {showTitle && <div className='text-base-500-reg-100-upper hidden md:block'>{title}</div>}
      <div
        className={`md:text-base-400-lg-100 group relative mt-[18px] select-none bg-base-100 pb-[18px] md:mt-0 md:min-w-[260px] md:rounded-[16px] md:border md:border-base-400 md:px-[16px] md:py-[12px] md:text-base-650 ${opened ? 'opened pb-0 md:rounded-b-none md:border-b-transparent' : ''} ${className}`}
        onClick={() => setOpened((prev) => !prev)}
      >
        <button
          type='button'
          className='text-base-100-reg-100 md:text-base-400-lg-100 flex w-full select-none items-center justify-between after:block after:size-[14px] after:bg-icon-triangle-arrow after:bg-default-contain group-[.opened]:after:-rotate-90 md:pb-0 md:text-base-650 md:after:rotate-90'
        >
          <div className='md:text-base-500-reg-100 text-base-100-reg-100_mobile text-base-600 md:text-base-650'>
            {showSelected()}
          </div>
        </button>
        <div className='text-base-500-reg-100-upper md:text-base-400-lg-100 inset-x-0 z-10 hidden select-none flex-col gap-[16px] bg-base-100 py-[24px] text-base-600 group-[.opened]:flex scroll-btn-yb:h-[10px] md:absolute md:top-[100%] md:max-h-[200px] md:overflow-auto md:rounded-b-[16px] md:border md:border-base-600/10 md:px-[16px] md:scrollbar-custom'>
          {showList()}
        </div>
      </div>
    </div>
  )
}

export default Selector
