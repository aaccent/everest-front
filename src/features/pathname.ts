import 'server-only'
import { headers } from 'next/headers'

export function getPathname(): string | undefined {
  const headersList = headers()

  if (!URL.canParse(headersList.get('x-url') || '')) return undefined

  const url = new URL(headersList.get('x-url')!)

  return url.pathname
}
