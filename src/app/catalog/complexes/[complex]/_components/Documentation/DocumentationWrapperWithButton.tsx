'use client'
import React, { PropsWithChildren, useState } from 'react'
import Button from '@/ui/buttons/Button'

interface Props extends PropsWithChildren {
  className?: string
}

function DocumentationWrapperWithButton({ className, children }: Props) {
  const [full, setFull] = useState<boolean>(false)
  const onButtonClick = () => {
    setFull((prev) => !prev)
  }
  return (
    <>
      <div className={`group/docs ${full ? 'active' : ''}`}>
        <div className={className}>{children}</div>
      </div>
      <Button variation='outline' size='medium' onClick={onButtonClick} className='mt-[16px] w-full md:mt-[40px]'>
        {full ? 'Свернуть' : 'Показать еще'}
      </Button>
    </>
  )
}

export default DocumentationWrapperWithButton
