import React from 'react'

interface RadioProps {
  text: string
  name: string
  onClick?: (value: string) => void
  id: number
}

function Radio({ text, name, onClick }: RadioProps) {
  const clickHandle = () => {
    if (!onClick) return
    onClick(text)
  }
  return (
    <label className='text-base-500-reg-100-upper' onClick={clickHandle}>
      <div className='flex items-center gap-[10px] before:block before:size-[20px] before:rounded-full before:bg-base-300 has-[:checked]:before:border-[6px] has-[:checked]:before:border-primary has-[:checked]:before:bg-base-100'>
        <input type='radio' className='absolute -z-10 opacity-0' name={name} />
        {text}
      </div>
    </label>
  )
}

export default Radio
