'use client'

import React from 'react'
import Input, { Props as InputProps } from '@/ui/inputs/Input'

type Props = Omit<InputProps<'text'>, 'placeholder' | 'mask' | 'type'>

function NameInput(props: Props) {
  return <Input mask={/^[\D ]*$/} type='text' placeholder='Имя' {...props} />
}

export default NameInput
