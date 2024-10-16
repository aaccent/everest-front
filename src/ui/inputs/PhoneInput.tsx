'use client'

import React from 'react'
import Input, { GetInputValueProps, Props as InputProps } from '@/ui/inputs/Input'

type Props = Omit<InputProps<'tel'>, 'placeholder' | 'mask' | 'type'>

function PhoneInput(props: Props) {
  function getValue({ maskRef }: GetInputValueProps) {
    return {
      masked: maskRef?.value || '',
      unmasked: maskRef?.unmaskedValue || '',
    }
  }

  return <Input mask='+{7}(000)000-00-00' type='tel' placeholder='Телефон' getValue={getValue} {...props} />
}

export default PhoneInput
