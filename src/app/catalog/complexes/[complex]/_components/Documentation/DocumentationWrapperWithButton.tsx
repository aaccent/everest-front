'use client'
import React, { Children, PropsWithChildren, useState } from 'react'
import Button from '@/ui/buttons/Button'

interface Props extends PropsWithChildren {
  className?: string
}

function DocumentationWrapperWithButton({ className, children }: Props) {
  const [full, setFull] = useState<boolean>(false)
  const onButtonClick = () => {
    setFull((prev) => !prev)
  }

  const childrenCount = Children.count(children)
  return (
    <>
      <div className={`group/docs ${full ? 'active' : ''}`}>
        <ul className={className}>{children}</ul>
      </div>
      {childrenCount > 8 ? (
        <Button variation='outline' size='medium' onClick={onButtonClick} className='mt-[16px] w-full md:mt-[40px]'>
          {full ? 'Свернуть' : 'Показать еще'}
        </Button>
      ) : null}
    </>
  )
}

export default DocumentationWrapperWithButton
