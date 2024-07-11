'use client'
import React from 'react'
import Button from '@/ui/buttons/Button'
import { useStyleState } from '@/features/styleStates'

function LoginButton() {
  const { hasAnyClass } = useStyleState()

  return (
    <Button
      className='h-[42px] min-w-[110px]'
      size='small'
      type={hasAnyClass('is-black', 'catalog-menu') ? 'second' : 'transparent'}
    >
      Войти
    </Button>
  )
}

export default LoginButton
