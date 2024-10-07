export const COOKIES = {
  NOTIFICATION: 'notification',
} as const

export type CookieName = (typeof COOKIES)[keyof typeof COOKIES]

// 30 дней * 24 часов * 60 минут * 60 секунд
export const ONE_MONTH = 30 * 24 * 60 * 60
export const ONE_YEAR = ONE_MONTH * 12

/** Парсит строку `cookiesStr` вида `name=value;name2=value;` в объект для дальнейшей работы */
export function parseCookies(cookiesStr: string) {
  const cookies = cookiesStr
    // Делим на записи между ";"
    .split(';')
    // Делим на ключ=значение
    .map((i) => i.trim().split('='))
    // Превращаем в объект
    .map((i) => ({ name: i[0], value: i[1] }))

  return {
    get(name: CookieName | string) {
      return cookies.find((i) => i.name === name)
    },
  }
}

/** Достаёт строку куков из `document.cookie` и парсит с помощью [parseCookies()]{@link parseCookies} */
export function cookies() {
  if (typeof window === 'undefined') return

  return parseCookies(document.cookie)
}

interface CookieOptions {
  /** @default [ONE_MONTH]{@link ONE_MONTH} */
  maxAge?: number
  /** @default / */
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
