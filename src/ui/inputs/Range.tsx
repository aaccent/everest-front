import React, { useEffect, useRef, useState } from 'react'
import { Range as RangeType } from '@/types/FiltersType'
import { InputValue } from '@/globals/utilityTypes'
import { convertPriceToFullView, convertPriceToShortView, getDigit, onlyNumbersInput } from '@/features/utility/price'
import { useFilter } from '@/features/useFilter'

export type RangeValue = RangeType['value']

export type Digit = 'тыс' | 'млн' | ''

interface ValueDigits {
  min: Digit
  max: Digit
}

export type RangeProps = {
  name: string
  min: number
  max: number
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

  const textRefMin = useRef<HTMLInputElement>(null)
  const textRefMax = useRef<HTMLInputElement>(null)

  const rangeRefMin = useRef<HTMLInputElement>(null)
  const rangeRefMax = useRef<HTMLInputElement>(null)

  const [digit, setDigit] = useState<ValueDigits>({ min: getDigit(value[0]), max: getDigit(value[1]) })

  const timeoutRef = useRef<NodeJS.Timeout>(null)

  const { removeFilter } = useFilter()

  useEffect(() => {
    if (customValue && customValue[0] === min && customValue[1] === max) {
      removeFilter(Number(name))
      setValue(defaultValue)
    } else {
      setValue(customValue || defaultValue)
    }
  }, [customValue])

  useEffect(() => {
    const newDigit = {
      min: getDigit(value[0]),
      max: getDigit(value[1]),
    }
    setDigit(newDigit)

    const newValue =
      prefix === '₽'
        ? {
            min: `${convertPriceToShortView(value[0])} ${newDigit.min} ${prefix}`,
            max: `${convertPriceToShortView(value[1])} ${newDigit.max} ${prefix}`,
          }
        : {
            min: `${value[0]} ${newDigit.min} ${prefix}`,
            max: `${value[1]} ${newDigit.max} ${prefix}`,
          }

    if (!textRefMin.current || !textRefMax.current) return

    textRefMin.current.value = newValue.min
    textRefMax.current.value = newValue.max

    if (!rangeRefMin.current || !rangeRefMax.current) return

    rangeRefMin.current.value = value[0].toString()
    rangeRefMax.current.value = value[1].toString()
  }, [value])

  const _onChange = (name: string, value: RangeValue) => {
    if (onChange) return onChange(name, value)
    setValue(value)
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.currentTarget.value = onlyNumbersInput(e.currentTarget.value)
  }

  function validateRangeValue(inputValue: number, position: 'min' | 'max') {
    switch (position) {
      case 'min':
        if (inputValue < min || inputValue > value[1]) return
        return inputValue
      case 'max':
        if (inputValue > max || inputValue < value[0]) return
        return inputValue
    }
  }

  function onRangeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputName = e.currentTarget.name as 'max' | 'min'
    const numberValue = Number(e.target.value)
    const rangeValue = validateRangeValue(numberValue, inputName)

    if (!rangeValue) return

    const newValue: RangeValue = inputName === 'min' ? [rangeValue, value[1]] : [value[0], rangeValue]

    setValue(newValue)
    if (prefix === '₽') setDigit({ min: getDigit(newValue[0]), max: getDigit(newValue[1]) })

    if (onChange) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => onChange(name, newValue), 700)
    }
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    const numberPart = parseFloat(e.currentTarget.value)
    const name = e.currentTarget.name as 'min' | 'max'
    const digitPart = digit[name]
    e.currentTarget.value = convertPriceToFullView(numberPart, digitPart).toString()
  }

  function validateValue(inputValue: number, position: 'min' | 'max') {
    switch (position) {
      case 'min':
        if (inputValue < min || inputValue > value[1]) return min
        return inputValue
      case 'max':
        if (inputValue > max || inputValue < value[0]) return max
        return inputValue
    }
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) {
    const inputValue = parseFloat(e.currentTarget.value)
    const inputName = e.currentTarget.name as 'min' | 'max'

    const validValue = validateValue(inputValue, inputName)

    const newDigit = { ...digit, [inputName]: getDigit(validValue) }
    setDigit(newDigit)

    e.currentTarget.value = convertPriceToShortView(validValue) + ` ${newDigit[inputName]}` + ` ${prefix}`

    if (inputName === 'min' && inputValue !== value[0]) return _onChange?.(name, [validValue, value[1]])
    if (inputName === 'max' && inputValue !== value[1]) return _onChange?.(name, [value[0], validValue])
  }

  const minPos = ((value[0] - min) / (max - min)) * 100
  const maxPos = ((value[1] - min) / (max - min)) * 100

  function setStep(value?: string) {
    if (!value) return step

    const numberValue = Number(value)
    if (numberValue > 1_000_000) return '100_000'
    if (numberValue > 1_000) return '100'
    return step
  }

  return (
    <div className='flex flex-col gap-[8px]'>
      {showTitle && <div className='text-base-500-reg-100-upper hidden md:block'>{title}</div>}
      <div
        className={`text-base-400-lg-100 relative w-full max-w-[260px] rounded-[20px] border border-base-400 bg-base-100 px-[16px] py-[18px] md:max-w-[260px] md:rounded-[16px] md:px-[15px] md:py-[12px] ${className}`}
      >
        <input type='hidden' name={title} />
        <div className='text-base-400-lg-100 flex items-center justify-between'>
          <label>
            <input
              ref={textRefMin}
              type='text'
              className='max w-full text-start focus:outline-0'
              onChange={onInputChange}
              onFocus={onFocus}
              onBlur={onBlur}
              name='min'
            />
          </label>
          <div className='absolute inset-1/2 h-[12px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-base-400' />
          <label>
            <input
              ref={textRefMax}
              type='text'
              className='min w-full text-end focus:outline-0'
              onChange={onInputChange}
              onFocus={onFocus}
              onBlur={onBlur}
              name='max'
            />
          </label>
        </div>
        <div className='absolute inset-x-0 bottom-0 h-[12px]'>
          <div className='absolute inset-x-[12px] bottom-[-10px] top-0'>
            <input
              ref={rangeRefMin}
              type='range'
              step={setStep(rangeRefMin.current?.value)}
              onChange={onRangeChange}
              className='track-transparent'
              min={min}
              max={max}
              name='min'
            />
            <input
              ref={rangeRefMax}
              type='range'
              step={setStep(rangeRefMax.current?.value)}
              min={min}
              max={max}
              onChange={onRangeChange}
              className='track-transparent'
              name='max'
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
