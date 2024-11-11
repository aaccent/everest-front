'use client'
import React from 'react'
import Input from '@/ui/inputs/Input'

interface SearchProps {
  placeholder?: string
}

function Search({ placeholder }: SearchProps) {
  const searchRegExp = /^[а-я -]+$/gi

  /**
   * @todo запрос к апи, когда будет готов бекенд
   **  const timeoutRef = useRef<NodeJS.Timeout>()
   **  const onChange = (value: string) => {
   *   if (timeoutRef.current) clearTimeout(timeoutRef.current)
   *   timeoutRef.current = setTimeout(() => console.log(`request to api with ${value || null}`), 300)
   *   }
   */

  return (
    <Input
      type='text'
      name='search-realtor'
      placeholder={placeholder}
      mask={searchRegExp}
      inputTextTransform='none'
      isSearch
    />
  )
}

export default Search
