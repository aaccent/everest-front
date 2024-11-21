import 'server-only'
import { headers } from 'next/headers'

export async function getPathname(): Promise<string | undefined> {
  const headersList = await headers()

  if (!URL.canParse(headersList.get('x-url') || '')) return undefined

  const url = new URL(headersList.get('x-url')!)

  return url.pathname
}
