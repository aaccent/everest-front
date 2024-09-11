'use client'
import React, { useState } from 'react'
import Checkbox from '@/ui/inputs/Checkbox'
import Radio from '@/ui/inputs/Radio'

interface FilterSelectProps {
  id: number
  values: string[]
  isRadio?: boolean
  showTitle: boolean
  name: string
  className?: string
  initValue?: Array<string | number>
  customValue?: {
    value: Array<string | number>
    setValue: (id: number, value: Array<string | number>) => void
  }
}

function Selector({ values, isRadio, showTitle, name, id, className, initValue, customValue }: FilterSelectProps) {
  const [opened, setOpened] = useState(false)
  const [selectedValues, setSelectedValues] = useState<Array<string | number>>(initValue || [])

  const _values = customValue ? customValue?.value : selectedValues
  const _setValues = (values: Array<string | number>) => {
    if (customValue) {
      customValue.setValue(id, values)
    } else {
      setSelectedValues(values)
    }
  }

  const onOptionClick = (checked: boolean, clickedValue: string) => {
    const newValues = new Set([..._values])
    if (checked) {
      newValues.add(clickedValue)
    } else {
      newValues.delete(clickedValue)
    }
    _setValues(Array.from(newValues))
  }

  function showSelected() {
    const defaultValue = window.matchMedia('(min-width:768px').matches ? 'Выбрать' : name
    const selectedNames = _values.length ? _values.join(', ') : defaultValue

    if (selectedNames.length > 20) return selectedNames.slice(0, 20) + `...`

    return selectedNames
  }

  function showOptions() {
    return values?.map((val, index) =>
      isRadio ? (
        <Radio key={index} text={val} name={name} id={id} />
      ) : (
        <Checkbox
          key={index}
          isInSelect
          name={val}
          id={id}
          initValue={_values.includes(val)}
          onClick={onOptionClick}
          customValue={{
            value: _values.includes(val),
          }}
        />
      ),
    )
  }

  return (
    <div className='flex flex-col gap-[8px] border-b border-b-base-600/10 first:border-t first:border-t-base-600/10 md:border-b-0 md:first:border-t-0'>
      {showTitle && <div className='text-base-500-reg-100-upper hidden md:block'>{name}</div>}
      <div
        className={`md:text-base-400-lg-100 group relative mt-[18px] select-none bg-base-100 px-[16px] pb-[18px] md:mt-0 md:min-w-[260px] md:rounded-[16px] md:border md:border-base-400 md:py-[12px] md:text-base-650 ${opened ? 'opened pb-0' : ''} ${className}`}
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
        <div className='text-base-500-reg-100-upper md:text-base-400-lg-100 inset-x-0 z-10 hidden select-none flex-col gap-[16px] bg-base-100 py-[24px] text-base-600 group-[.opened]:flex md:absolute md:rounded-b-[16px] md:px-[16px]'>
          {showOptions()}
        </div>
      </div>
    </div>
  )
}

export default Selector
