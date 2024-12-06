'use client'

export function useFullUrl() {
  if (typeof window === 'undefined') return ''

  return window.location.href
}
