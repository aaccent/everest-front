'use client'
import React, { useState } from 'react'
import { IMaskInput } from 'react-imask'
import { InputValue } from '@/globals/utilityTypes'

export type RangeValue = { min: number; max: number }

export type RangeProps = {
  name: string
  min: number
  max: number
  /** @default { min, max } */
  defaultValue?: RangeValue
  units?: string
  className?: string
  title: string
  showTitle?: boolean
} & InputValue<RangeValue>

function Range({
  name,
  min,
  max,
  units = '',
  className,
  title,
  showTitle,
  onChange,
  value: customValue,
  defaultValue = { min, max },
}: RangeProps) {
  const [value, setValue] = useState<RangeValue>(defaultValue)

  const step = 0.1

  const _value = customValue || value

  const _setValue = (value: RangeValue) => {
    onChange?.(name, value)
    if (!customValue) setValue(value)
  }

  const onMinValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > _value.max || +e.target.value < min) return
    _setValue({
      min: +e.target.value,
      max: _value.max,
    })
  }
  const onMaxValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < _value.min) return
    _setValue({
      min: _value.min,
      max: +e.target.value,
    })
  }

  const onMinInputChange = (newValue: string) => {
    const numberValue = newValue.match(/\d+\.?\d?/)

    if (!numberValue || +numberValue < min || +numberValue === _value.min) return
    if (+numberValue[0] > _value.max) return _setValue({ min, max: _value.max })
    _setValue({ min: +numberValue, max: _value.max })
  }
  const onMaxInputChange = (newValue: string) => {
    const numberValue = newValue.match(/\d+\.?\d?/)

    if (!numberValue || +numberValue > max || +numberValue[0] < _value.min || +numberValue === _value.max) return
    _setValue({ min: _value.min, max: +numberValue })
  }

  const minPos = ((_value.min - min) / (max - min)) * 100
  const maxPos = ((_value.max - min) / (max - min)) * 100

  return (
    <div className='flex flex-col gap-[8px]'>
      {showTitle && <div className='text-base-500-reg-100-upper'>{title}</div>}
      <div
        className={`text-base-400-lg-100 relative w-full min-w-[260px] rounded-[20px] bg-base-100 px-[16px] py-[18px] md:max-w-[260px] md:rounded-[16px] md:px-[15px] md:py-[12px] ${className}`}
      >
        <input type='hidden' name={title} value={`${[_value.min, _value.max]}`} />
        <div className='text-base-400-lg-100 flex items-center justify-between'>
          <label>
            <IMaskInput
              mask={[
                {
                  mask: `от num ${units}`,
                  lazy: false,
                  blocks: {
                    num: {
                      mask: Number,
                      min,
                      max: _value.max,
                      scale: 1,
                      normalizeZeros: false,
                      radix: '.',
                    },
                  },
                },
              ]}
              className='w-full focus:outline-0'
              value={_value.min.toString()}
              onAccept={(value) => onMinInputChange(value)}
            />
          </label>
          <div className='absolute inset-1/2 h-[12px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-base-400' />
          <label>
            <IMaskInput
              mask={[
                {
                  mask: `до num ${units}`,
                  lazy: false,
                  blocks: {
                    num: {
                      mask: Number,
                      min: _value.min,
                      max,
                      scale: 1,
                      normalizeZeros: false,
                      radix: '.',
                    },
                  },
                },
              ]}
              className='w-full text-end focus:outline-0'
              value={_value.max.toString()}
              onAccept={(value) => onMaxInputChange(value)}
            />
          </label>
        </div>
        <div className='absolute inset-x-0 bottom-0 h-[12px]'>
          <div className='absolute inset-x-[12px] inset-y-0'>
            <input
              type='range'
              step={step}
              onChange={onMinValChange}
              className='track-transparent'
              value={_value.min}
              min={min}
              max={max}
              onMouseUp={() => _setValue?.({ min: _value.min, max: _value.max })}
            />
            <input
              type='range'
              step={step}
              min={min}
              max={max}
              onChange={onMaxValChange}
              className='track-transparent'
              value={_value.max}
              onMouseUp={() => _setValue({ min: _value.min, max: _value.max })}
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
