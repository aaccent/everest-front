'use client'
import React from 'react'
import Button, { ButtonVariation } from '@/ui/buttons/Button'
import { useStyleState } from '@/features/styleStates'

function LoginButton() {
  const { hasAnyClass } = useStyleState()

  let type: ButtonVariation = 'transparent'

  if (hasAnyClass('is-black', 'catalog-menu', 'is-scrolled')) {
    type = 'second'
  }

  return (
    <Button className='h-[42px] min-w-[110px]' size='small' variation={type}>
      Войти
    </Button>
  )
}

export default LoginButton
