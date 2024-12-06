import React from 'react'
import { useInputRegister } from '@/features/form/useInputRegister'
import { INPUT_NAMES } from '@/globals/inputs/call-form'
import { useFullUrl } from '@/features/useFullUrl'

function UrlInput() {
  const { inputRef } = useInputRegister(INPUT_NAMES.URL.name, { type: 'text' })
  const url = useFullUrl()

  return <input type='hidden' name={INPUT_NAMES.URL.name} value={url} ref={inputRef} />
}

export default UrlInput
