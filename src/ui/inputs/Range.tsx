'use client'
import React, { useState } from 'react'

interface RangeProps {
  min: number
  max: number
  units?: string
}

function Range({ min, max, units }: RangeProps) {
  const [value, setValue] = useState({ min, max })
  const step = 0.1

  const onMinValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (+e.target.value >= value.max) return
    const newMinVal = Math.min(+e.target.value, value.max - step)
    setValue({
      min: newMinVal,
      max: value.max,
    })
  }
  const onMaxValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (+e.target.value <= value.min) return
    const newMaxVal = Math.max(+e.target.value, value.min + step)
    setValue({
      min: value.min,
      max: newMaxVal,
    })
  }

  const minPos = ((value.min - min) / (max - min)) * 100
  const maxPos = ((value.max - min) / (max - min)) * 100
  return (
    <div className='text-base-400-lg-100 relative min-w-[273px] rounded-[16px] bg-base-100 px-[15px] py-[12px]'>
      <div className='relative flex items-center justify-between after:absolute after:inset-1/2 after:block after:h-[12px] after:w-[1px] after:-translate-x-1/2 after:-translate-y-1/2 after:bg-base-400'>
        <div className='text-base-650'>
          от
          <span className='text-base-600'>
            {' '}
            {value.min} {units}
          </span>
        </div>
        <div className='text-base-650'>
          от
          <span className='text-base-600'>
            {' '}
            {value.max} {units}
          </span>
        </div>
      </div>
      <div className='absolute inset-x-0 bottom-0 h-[12px]'>
        <div className='absolute inset-x-[12px] inset-y-0'>
          <input
            type='range'
            step={step}
            min={min}
            max={max}
            onChange={onMinValChange}
            className='track-transparent'
            value={value.min}
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
