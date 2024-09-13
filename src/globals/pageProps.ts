import 'server-only'
import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import { Viewport } from '@/features/utility/adaptive'

export interface LayoutProps {
  viewport?: Viewport
}

const PHONE_OS = ['Android', 'iOS', 'Android[-x86]', 'HarmonyOS', 'Windows [Phone/Mobile]', 'BlackBerry']

export function basePageProps(): LayoutProps {
  const parsedUserAgent = userAgent({ headers: headers() })

  const viewport = PHONE_OS.includes(parsedUserAgent.os.name || '') ? 'mobile' : 'desktop'

  return { viewport }
}
