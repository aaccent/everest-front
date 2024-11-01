'use client'
import React, { useState } from 'react'
import { IMaskInput } from 'react-imask'
import { InputValue } from '@/globals/utilityTypes'
import { Range as RangeType } from '@/types/FiltersType'

export type RangeValue = RangeType['value']

export type RangeProps = {
  name: string
  min: number
  max: number
  /** @default { min, max } */
  defaultValue?: RangeValue
  prefix?: string
  className?: string
  title: string
  showTitle?: boolean
  step?: number
} & InputValue<RangeValue>

function Range({
  name,
  min,
  max,
  prefix = '',
  className,
  title,
  showTitle,
  onChange,
  value: customValue,
  defaultValue = [min, max],
  step = 1,
}: RangeProps) {
  const [value, setValue] = useState<RangeValue>(defaultValue)

  const _value = customValue || value

  const _setValue = (value: RangeValue) => {
    onChange?.(name, value)
    if (!customValue) setValue(value)
  }

  const onMinValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > _value[1] || +e.target.value < min) return
    _setValue([+e.target.value, _value[1]])
  }
  const onMaxValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < _value[0]) return
    _setValue([_value[0], +e.target.value])
  }

  const onMinInputChange = (newValue: string) => {
    const numberValue = Number(newValue)

    if (numberValue < min || numberValue === _value[0]) return
    if (numberValue > _value[1]) return _setValue([min, _value[1]])
    _setValue([+numberValue, _value[1]])
  }
  const onMaxInputChange = (newValue: string) => {
    const numberValue = Number(newValue)

    if (numberValue > max || numberValue < _value[0] || numberValue === _value[1]) return
    _setValue([_value[0], +numberValue])
  }

  const minPos = ((_value[0] - min) / (max - min)) * 100
  const maxPos = ((_value[1] - min) / (max - min)) * 100

  return (
    <div className='flex flex-col gap-[8px]'>
      {showTitle && <div className='text-base-500-reg-100-upper hidden md:block'>{title}</div>}
      <div
        className={`text-base-400-lg-100 relative w-full min-w-[260px] rounded-[20px] border border-base-400 bg-base-100 px-[16px] py-[18px] md:max-w-[260px] md:rounded-[16px] md:px-[15px] md:py-[12px] ${className}`}
      >
        <input type='hidden' name={title} value={`${[_value[0], _value[1]]}`} />
        <div className='text-base-400-lg-100 flex items-center justify-between'>
          <label>
            <IMaskInput
              mask={`от num ${prefix}`}
              lazy={false}
              blocks={{
                num: {
                  mask: Number,
                  radix: '.',
                },
              }}
              className='w-full focus:outline-0'
              value={_value[0].toString()}
              onAccept={(value) => onMinInputChange(value)}
              unmask
            />
          </label>
          <div className='absolute inset-1/2 h-[12px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-base-400' />
          <label>
            <IMaskInput
              mask={`до num ${prefix}`}
              lazy={false}
              blocks={{
                num: {
                  mask: Number,
                  radix: '.',
                },
              }}
              className='w-full text-end focus:outline-0'
              value={_value[1].toString()}
              onAccept={(value) => onMaxInputChange(value)}
              unmask
            />
          </label>
        </div>
        <div className='absolute inset-x-0 bottom-0 h-[12px]'>
          <div className='absolute inset-x-[12px] bottom-[-10px] top-0'>
            <input
              type='range'
              step={step}
              onChange={onMinValChange}
              className='track-transparent'
              value={_value[0]}
              min={min}
              max={max}
            />
            <input
              type='range'
              step={step}
              min={min}
              max={max}
              onChange={onMaxValChange}
              className='track-transparent'
              value={_value[1]}
            />
          </div>

          <div className='absolute bottom-0 left-[12px] right-[24px] h-[2px]'>
            <div
              style={{ left: `${minPos}%` }}
              className='absolute top-1/2 size-[12px] -translate-y-1/2 rounded-full bg-primary'
            ></div>
            <div className='absolute inset-x-0 inset-y-0 bg-transparent'>
              <div
                style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
                className='absolute inset-0 bg-primary'
              ></div>
            </div>
            <div
              style={{ left: `${maxPos}%` }}
              className='absolute right-0 top-1/2 size-[12px] -translate-y-1/2 rounded-full bg-primary'
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Range
