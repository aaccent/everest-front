'use client'
import React, { useEffect, useRef, useState } from 'react'
import Checkbox from '@/ui/inputs/Checkbox'
import Radio from '@/ui/inputs/Radio'
import { CheckboxChangeFn, InputValue } from '@/globals/utilityTypes'
import { useInputRegister } from '@/features/form/useInputRegister'

export type SelectorValue = Array<string>

const MAX_STRING_SIZE = 17
const SEPARATOR = ', '

export type Props = {
  name: string
  title?: string
  showTitle?: boolean
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
  required?: boolean
  variation?: 'dark' | 'light'
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
  required,
  variation = 'light',
}: Props) {
  const { inputRef } = useInputRegister(name, {
    type: isRadio ? 'radio' : 'selector',
    getValue: () => {
      if (isRadio) {
        return inputRef.current?.value || ''
      } else {
        return inputRef.current?.value.split(SEPARATOR) || []
      }
    },
  })
  const [opened, setOpened] = useState(false)
  const [value, setValue] = useState<SelectorValue>(defaultValue)
  const divRef = useRef<HTMLDivElement | null>(null)

  const _value = customValue || value

  function closeSelectorIfClickAway(e: MouseEvent) {
    if (!(e.target instanceof Element)) return
    if (!e.target || !divRef.current) return
    if (divRef.current.contains(e.target) || divRef.current === e.target) return
    setOpened(false)
  }

  useEffect(() => {
    if (!opened) return document.removeEventListener('click', closeSelectorIfClickAway)
    document.addEventListener('click', closeSelectorIfClickAway)
    return () => document.removeEventListener('click', closeSelectorIfClickAway)
  }, [opened])

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
      setOpened(false)
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
    let output = ''
    if (title) output = title
    if (_value.length) output = _value.join(SEPARATOR)

    if (output.length > MAX_STRING_SIZE) {
      return output.slice(0, MAX_STRING_SIZE) + `...`
    }

    return output
  }

  // prettier-ignore
  const innerClassName = variation === 'light'
      ? 'bg-base-100 md:border md:border-base-400 md:text-base-650'
      : 'bg-base-115 text-base-100 border-0'

  const isPlaceholder = !value.length

  // prettier-ignore
  const buttonClassName = variation === 'light'
    ? `${isPlaceholder ? 'text-base-600/50' : 'text-base-600' } md:text-base-650`
    : `${isPlaceholder ? 'text-base-100/50' : 'text-base-100' } border-0 after:filter-base-100`

  // prettier-ignore
  const listClassName = variation === 'light'
      ? 'bg-base-100 text-base-600 md:border md:border-base-600/10 md:top-full'
      : 'bg-[#5B8A85] text-base-100 border-0 md:top-[calc(100%_-_1px)]'

  return (
    <div className='flex flex-col gap-[8px]'>
      {showTitle && <div className='text-base-500-reg-100-upper hidden md:block'>{title}</div>}
      <div
        className={`md:text-base-400-lg-100 group relative mt-[18px] flex select-none items-center pb-[18px] md:mt-0 md:min-w-[260px] md:rounded-[16px] md:px-[16px] md:py-[12px] ${opened ? 'pb-0 md:rounded-b-none md:border-b-transparent' : ''} ${className} ${innerClassName}`}
        ref={divRef}
      >
        <input type='hidden' name={name} value={value.join(',')} required={required} ref={inputRef} />
        <button
          className={`md:text-base-400-reg-100 text-base-100-reg-100 flex w-full cursor-pointer select-none items-center justify-between after:block after:size-[14px] after:bg-icon-triangle-arrow after:bg-default-contain group-[.opened]:after:-rotate-90 md:pb-0 md:after:rotate-90 ${buttonClassName}`}
          type='button'
          onClick={() => setOpened((prev) => !prev)}
        >
          {showSelected()}
        </button>

        <div
          className={`text-base-500-reg-100-upper md:text-base-400-lg-100 inset-x-0 z-10 select-none flex-col gap-[16px] py-[24px] scroll-btn-yb:h-[10px] md:absolute md:max-h-[200px] md:overflow-auto md:rounded-b-[16px] md:px-[16px] md:scrollbar-custom ${opened ? 'flex' : 'hidden'} ${listClassName}`}
        >
          {showList()}
        </div>
      </div>
    </div>
  )
}

export default Selector
