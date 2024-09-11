'use client'
import React, { useState } from 'react'
import { IMaskInput } from 'react-imask'

export interface RangeProps {
  id: number
  min: number
  max: number
  initValue?: { min: number; max: number }
  units?: string
  className?: string
  name: string
  showTitle?: boolean
  customValue?: {
    value: { min: number; max: number }
    setValue: (id: number, value: [number, number]) => void
  }
}

function Range({ id, min, max, units = '', className, name, showTitle, customValue, initValue }: RangeProps) {
  const [value, setValue] = useState(initValue || { min, max })

  const step = 0.1

  const _value = customValue ? customValue.value : value

  const _setValue = ({ min, max }: { min: number; max: number }) => {
    if (customValue) {
      customValue.setValue(id, [min, max])
    } else {
      setValue({ min, max })
    }
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
      {showTitle && <div className='text-base-500-reg-100-upper hidden md:block'>{name}</div>}
      <div
        className={`text-base-400-lg-100 relative w-full min-w-[260px] rounded-[20px] border border-base-400 bg-base-100 px-[16px] py-[18px] md:max-w-[260px] md:rounded-[16px] md:px-[15px] md:py-[12px] ${className}`}
      >
        <input type='hidden' name={name} value={`${[_value.min, _value.max]}`} />
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
