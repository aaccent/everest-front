'use client'
import React, { useEffect, useState } from 'react'
import { IMaskInput } from 'react-imask'
import { useCategoryFilter } from '@/features/useCategoryFilter'

interface RangeProps {
  id: number
  min: number
  max: number
  units?: string
  className?: string
  name: string
  showTitle?: boolean
}

function Range({ id, min, max, units = '', className, name, showTitle }: RangeProps) {
  const [value, setValue] = useState({ min, max })
  const { addFilter, findFilter } = useCategoryFilter()

  const step = 0.1

  useEffect(() => {
    const currentFilters = findFilter<{ id: number; value: number[] }>(id)
    if (currentFilters) {
      setValue({ min: currentFilters.value[0], max: currentFilters.value[1] })
    }
  }, [])

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

  const onMinInputChange = (newValue: string) => {
    const numberValue = newValue.match(/\d+\.?\d?/)

    if (!numberValue || +numberValue < min) return
    if (+numberValue[0] > value.max) return setValue({ min, max: value.max })
    setValue({ min: +numberValue, max: value.max })
    setTimeout(() => {
      if (+numberValue !== value.min) addFilter(id, [+numberValue, value.max])
    }, 1500)
  }
  const onMaxInputChange = (newValue: string) => {
    const numberValue = newValue.match(/\d+\.?\d?/)

    if (!numberValue || +numberValue > max || +numberValue[0] < value.min) return
    setValue({ min: value.min, max: +numberValue })
    setTimeout(() => {
      if (+numberValue !== value.max) addFilter(id, [value.min, +numberValue])
    }, 1500)
  }

  const minPos = ((value.min - min) / (max - min)) * 100
  const maxPos = ((value.max - min) / (max - min)) * 100

  return (
    <div className='flex flex-col gap-[8px]'>
      {showTitle && <div className='text-base-500-reg-100-upper'>{name}</div>}
      <div
        className={`text-base-400-lg-100 relative w-full min-w-[260px] rounded-[20px] bg-base-100 px-[16px] py-[18px] md:max-w-[260px] md:rounded-[16px] md:px-[15px] md:py-[12px] ${className}`}
      >
        <input type='hidden' name={name} value={`${[value.min, value.max]}`} />
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
                      max: value.max,
                      scale: 1,
                      normalizeZeros: false,
                      radix: '.',
                    },
                  },
                },
              ]}
              className='w-full focus:outline-0'
              value={value.min.toString()}
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
                      min: value.min,
                      max,
                      scale: 1,
                      normalizeZeros: false,
                      radix: '.',
                    },
                  },
                },
              ]}
              className='w-full text-end focus:outline-0'
              value={value.max.toString()}
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
              value={value.min}
              min={min}
              max={max}
              onMouseUp={() => addFilter(id, [value.min, value.max])}
            />
            <input
              type='range'
              step={step}
              min={min}
              max={max}
              onChange={onMaxValChange}
              className='track-transparent'
              value={value.max}
              onMouseUp={() => addFilter(id, [value.min, value.max])}
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
