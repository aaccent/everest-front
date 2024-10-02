export const COOKIES = {
  NOTIFICATION: 'notification',
} as const

export type CookieName = (typeof COOKIES)[keyof typeof COOKIES]

export const ONE_MONTH = 30 * 24 * 60 * 60

export function parseCookies(cookiesStr: string) {
  const cookies = cookiesStr
    .split(';')
    .map((i) => i.trim().split('='))
    .map((i) => ({ name: i[0], value: i[1] }))

  return {
    get(name: CookieName | string) {
      return cookies.find((i) => i.name === name)
    },
    all() {
      return cookies
    },
  }
}

export function cookies() {
  if (typeof window === 'undefined') return

  return parseCookies(document.cookie)
}

interface CookieOptions {
  maxAge?: number
  path?: string
}

export function setCookie(name: CookieName | string, value: string, options?: CookieOptions) {
  if (typeof window === 'undefined') return

  const _options = Object.assign(
    {
      maxAge: ONE_MONTH,
      path: '/',
    },
    options,
  )

  document.cookie = `${name}=${value}; Max-Age=${_options.maxAge}; Path=${_options.path};`
}
