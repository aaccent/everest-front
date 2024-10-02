import React from 'react'

interface RadioProps {
  title: string
  name: string
  value: string
  checked: boolean
  onClick?: (value: string) => void
}

function Radio({ title, name, value, onClick, checked }: RadioProps) {
  const _onClick = () => {
    onClick?.(value)
  }

  return (
    <label className='text-base-500-reg-100-upper cursor-pointer'>
      <div className='flex items-center gap-[10px] before:block before:h-[20px] before:w-full before:max-w-[20px] before:rounded-full before:bg-base-300 has-[:checked]:before:border-[6px] has-[:checked]:before:border-primary has-[:checked]:before:bg-base-100'>
        <input type='radio' checked={checked} className='absolute -z-10 opacity-0' onChange={_onClick} name={name} />
        {title}
      </div>
    </label>
  )
}

export default Radio
