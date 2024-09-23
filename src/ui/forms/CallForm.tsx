'use client'

import { ConvertToCustomInputsMap, Form, FormImperativeRef, InputsMap } from '@/features/form/form'
import React, { PropsWithChildren, useContext, useRef } from 'react'
import { sendCallRequest } from '@/globals/api'
import { INPUT_NAMES } from '@/globals/inputs/call-form'
import { PopupContext } from '@/features/visible/Popup'

type Inputs = ConvertToCustomInputsMap<typeof INPUT_NAMES>

interface Props extends PropsWithChildren {
  className?: string
}

export default function CallForm({ className, children }: Props) {
  const formRef = useRef<FormImperativeRef>(null)
  const { openPopup } = useContext(PopupContext)

  async function callFormHandler(inputs: InputsMap) {
    const _inputs = inputs as unknown as Inputs

    const ok = await sendCallRequest({
      phone: _inputs.tel.value,
      name: _inputs.name.value,
      time: _inputs.time.value,
    })

    if (!ok) return

    openPopup('thxPopup')
    formRef.current?.reset()
  }

  return (
    <Form className={className} onSubmit={callFormHandler} ref={formRef}>
      {children}
    </Form>
  )
}
