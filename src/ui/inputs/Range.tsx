'use client'
import React, { useState } from 'react'
import { IMaskInput } from 'react-imask'

interface RangeProps {
  min: number
  max: number
  units?: string
  className?: string
}

function Range({ min, max, units, className }: RangeProps) {
  const [value, setValue] = useState({ min, max })
  const step = 0.1

  const onMinValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > value.max || +e.target.value < min) return
    setValue({
      min: +e.target.value,
      max: value.max,
    })
  }
  const onMaxValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < value.min) return
    setValue({
      min: value.min,
      max: +e.target.value,
    })
  }

  const onMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value >= min && +e.target.value < value.max) {
      setValue({ min: +e.target.value, max: value.max })
    }
  }
  const onMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > value.min && +e.target.value <= max) {
      setValue({ min: value.min, max: +e.target.value })
    }
  }

  const minPos = ((value.min - min) / (max - min)) * 100
  const maxPos = ((value.max - min) / (max - min)) * 100

  return (
    <div
      className={`text-base-400-lg-100 relative min-w-[260px] rounded-[20px] bg-base-100 px-[16px] py-[18px] md:rounded-[16px] md:px-[15px] md:py-[12px] ${className}`}
    >
      <div className='text-base-400-lg-100 flex items-center justify-between'>
        <label>
          <span className='text-base-650'>от</span>
          <IMaskInput
            size={3}
            mask='0[00][.][0]'
            min={min}
            max={value.max}
            className='px-[3px] text-center focus:outline-0'
            value={value.min.toString()}
            onChange={onMinInputChange}
          />
          <span>{units}</span>
        </label>
        <div className='absolute inset-1/2 h-[12px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-base-400' />
        <label>
          <span className='text-base-650'>до</span>
          <IMaskInput
            size={3}
            mask='0[00][.][0]'
            className='px-[3px] text-center focus:outline-0'
            value={value.max.toString()}
            onChange={onMaxInputChange}
          />
          <span>{units}</span>
        </label>
      </div>
      <div className='absolute inset-x-0 bottom-0 h-[12px]'>
        <div className='absolute inset-x-[12px] inset-y-0'>
          <input
            type='range'
            step={step}
            onChange={onMinValChange}
            className='track-transparent'
            value={value.min}
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
            value={value.max}
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
  )
}

export default Range
