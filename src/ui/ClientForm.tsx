'use client'

import React, { PropsWithChildren, useRef } from 'react'

interface Props extends PropsWithChildren {
  className?: string
  action?: (formData: FormData) => Promise<boolean>
}

function ClientForm({ className, action, children }: Props) {
  const formRef = useRef<HTMLFormElement>(null)

  async function _action(formData: FormData) {
    if (!action) return

    const ok = await action(formData)
    if (ok) {
      formRef.current?.reset()
    }
  }

  return (
    <form className={className} action={_action} ref={formRef}>
      {children}
    </form>
  )
}

export default ClientForm
