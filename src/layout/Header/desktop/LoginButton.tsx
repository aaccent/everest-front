'use client'
import React, { useContext } from 'react'
import Button, { ButtonVariation } from '@/ui/buttons/Button'
import { HeaderContext } from '@/layout/Header/Header.context'
import { usePathname } from 'next/navigation'

function LoginButton() {
  const pathName = usePathname()
  const header = useContext(HeaderContext)

  let type: ButtonVariation = 'transparent'

  if (header.menu || header.scrolled || pathName !== '/') {
    type = 'second'
  }

  return (
    <Button className='h-[42px] min-w-[110px]' size='small' variation={type}>
      Войти
    </Button>
  )
}

export default LoginButton
