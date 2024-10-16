import { NextRequest, NextResponse } from 'next/server'

export const EXAMPLE_IP = '94.180.249.90'

// Это необходимо для получения пути запроса. Next не имеет хуков или функций, чтобы узнать о запрашиваемом URL
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-url', request.url)

  if (process.env.NODE_ENV === 'development') {
    requestHeaders.set('x-forwarded-for', EXAMPLE_IP)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        {
          type: 'header',
          key: 'purpose',
          value: 'prefetch',
        },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      has: [
        { type: 'header', key: 'next-router-prefetch' },
        {
          type: 'header',
          key: 'purpose',
          value: 'prefetch',
        },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      has: [{ type: 'header', key: 'x-present' }],
      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
    },
  ],
}
