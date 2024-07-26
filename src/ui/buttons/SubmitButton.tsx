'use client'

import React, { PropsWithChildren } from 'react'
import { useFormStatus } from 'react-dom'
import Button, { Props as ButtonProps } from '@/ui/buttons/Button'

type Props = Omit<ButtonProps, 'loading'> & PropsWithChildren

function SubmitButton({ children, ...buttonProps }: Props) {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' loading={pending} {...buttonProps}>
      {children}
    </Button>
  )
}

export default SubmitButton
