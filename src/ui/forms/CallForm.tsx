'use client'

import { ConvertToCustomInputsMap, Form, FormImperativeRef, InputsMap } from '@/features/form/form'
import React, { PropsWithChildren, useRef } from 'react'
import { sendCallRequest } from '@/globals/api'
import { INPUT_NAMES } from '@/globals/inputs/call-form'

type Inputs = ConvertToCustomInputsMap<typeof INPUT_NAMES>

interface Props extends PropsWithChildren {
  className?: string
}

export default function CallForm({ className, children }: Props) {
  const formRef = useRef<FormImperativeRef>(null)

  async function callFormHandler(inputs: InputsMap) {
    const _inputs = inputs as unknown as Inputs

    const ok = await sendCallRequest({
      phone: _inputs.tel.value,
      name: _inputs.name.value,
      time: _inputs.time.value,
    })

    if (!ok) return

    formRef.current?.reset()
  }

  return (
    <Form className={className} onSubmit={callFormHandler} ref={formRef}>
      {children}
    </Form>
  )
}
