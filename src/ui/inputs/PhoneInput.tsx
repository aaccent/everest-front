'use client'

import React from 'react'
import Input, { Props as InputProps } from '@/ui/inputs/Input'

type Props = Omit<InputProps, 'placeholder' | 'mask' | 'type'>

function PhoneInput(props: Props) {
  return <Input mask='+{7}(000)000-00-00' type='tel' placeholder='Телефон' {...props} />
}

export default PhoneInput
