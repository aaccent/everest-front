'use client'
import React, { useRef } from 'react'
import Input from '@/ui/inputs/Input'

interface SearchProps {
  placeholder?: string
  onChange: (value: string) => void
}

function Search({ placeholder, onChange }: SearchProps) {
  const searchRegExp = /^[а-я -]+$/gi
  const timeoutRef = useRef<NodeJS.Timeout>()

  const _onChange = (value: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => onChange(value), 300)
  }

  return (
    <Input
      type='text'
      name='search-realtor'
      placeholder={placeholder}
      mask={searchRegExp}
      inputTextTransform='none'
      onChangeCustom={_onChange}
      isSearch
    />
  )
}

export default Search
