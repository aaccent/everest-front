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
        <Checkbox
          key={index}
          isInSelect
          defaultChecked={_value.includes(itemValue)}
          onChange={onCheckboxChanged}
          {...props}
        />
      )
    })
  }

  function showSelected() {
    const selectedNames = _value.length ? _value.join(', ') : 'Выбрать'

    if (selectedNames.length > 20) return selectedNames.slice(0, 20) + `...`

    return selectedNames
  }

  return (
    <div className='flex flex-col gap-[8px]'>
      {showTitle && <div className='text-base-500-reg-100-upper'>{title}</div>}
      <div
        className={`group relative select-none border-b border-b-base-600/10 bg-base-100 pb-[18px] first:border-t first:border-t-base-600/10 first:pt-[18px] md:w-[260px] md:rounded-[16px] md:border-b-0 md:px-[16px] md:py-[12px] md:first:border-t-0 ${opened ? 'opened' : ''} ${className}`}
        onClick={() => setOpened((prev) => !prev)}
      >
        <button
          type='button'
          className='text-base-100-reg-100 md:text-base-400-lg-100 flex w-full select-none items-center justify-between after:block after:size-[14px] after:bg-icon-triangle-arrow after:bg-default-contain group-[.opened]:after:-rotate-90 md:pb-0 md:text-base-650 md:after:rotate-90'
        >
          <div>{showSelected()}</div>
        </button>
        <div className='text-base-500-reg-100-upper md:text-base-400-lg-100 absolute inset-x-0 z-10 hidden select-none flex-col gap-[16px] border-b border-b-base-600/10 bg-base-100 py-[24px] group-[.opened]:flex md:rounded-b-[16px] md:px-[16px] md:group-[.opened]:border-b-0'>
          {showList()}
        </div>
      </div>
    </div>
  )
}

export default Selector
