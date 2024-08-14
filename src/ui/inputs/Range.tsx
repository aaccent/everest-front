'use client'
import React, { useState } from 'react'
import { IMaskInput } from 'react-imask'

interface RangeProps {
  min: number
  max: number
  units?: string
}

function Range({ min, max, units }: RangeProps) {
  const [value, setValue] = useState({ min, max })
  const step = 0.1

  const onMinValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value > value.max - 5) return
    setValue({
      min: +e.target.value,
      max: value.max,
    })
  }
  const onMaxValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < value.min + 5) return
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
    <div className='text-base-400-lg-100 relative min-w-[273px] rounded-[16px] bg-base-100 px-[15px] py-[12px]'>
      <div className='text-base-400-lg-100 flex items-center justify-center'>
        <label>
          <span className='text-base-650'>от</span>
          <IMaskInput
            size={3}
            mask='0[00][.][0]'
            min={min}
            max={value.max}
            className='px-[5px] focus:outline-0'
            value={value.min.toString()}
            onChange={onMinInputChange}
          />
          <span>{units}</span>
        </label>
        <div className='mx-[78px] h-[12px] w-[1px] bg-base-400 md:mx-[56px]' />
        <label>
          <span className='text-base-650'>до</span>
          <IMaskInput
            size={3}
            mask='0[00][.][0]'
            className='px-[5px] focus:outline-0'
            value={value.max.toString()}
            onChange={onMaxInputChange}
          />
          <span>{units}</span>
        </label>
      </div>
      <div className='absolute inset-x-0 bottom-0 h-[12px]'>
        <div className='absolute inset-x-[12px] inset-y-0'>
          <input type='range' step={step} onChange={onMinValChange} className='track-transparent' value={value.min} />
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
