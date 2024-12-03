import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import BasePage from '@/layout/BasePage'

const geologica = localFont({
  src: [
    {
      path: '../assets/fonts/Geologica/Geologica_Cursive-Medium.woff',
      weight: '500',
    },
    {
      path: '../assets/fonts/Geologica/Geologica_Cursive-Medium.woff2',
      weight: '500',
    },
    {
      path: '../assets/fonts/Geologica/Geologica_Cursive-Regular.woff',
      weight: '400',
    },
    {
      path: '../assets/fonts/Geologica/Geologica_Cursive-Regular.woff2',
      weight: '400',
    },
    {
      path: '../assets/fonts/Geologica/Geologica_Cursive-Light.woff',
      weight: '300',
    },
    {
      path: '../assets/fonts/Geologica/Geologica_Cursive-Light.woff2',
      weight: '300',
    },
  ],
  display: 'swap',
  variable: '--font-geologica',
  style: 'cursive',
})

const coolvetica = localFont({
  src: [
    {
      path: '../assets/fonts/Coolvetica/coolvetica-condensed-rg.woff',
    },
    {
      path: '../assets/fonts/Coolvetica/coolvetica-condensed-rg.woff2',
    },
  ],
  display: 'swap',
  variable: '--font-coolvetica',
})

function shortAppEnv() {
  switch (process.env.APP_ENV) {
    case 'development':
      return 'dev'
    case 'test':
      return 'test'
    default:
    case 'production':
      return 'prod'
  }
}

function getMetadata(): Metadata {
  let title = ''

  if (process.env.APP_ENV !== 'production') {
    title += `${shortAppEnv()} / `
  }

  title += 'Everest'

  return {
    title,
  }
}

export const metadata: Metadata = getMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body className={`${geologica.variable} ${coolvetica.variable} font-geologica`}>
        <BasePage>{children}</BasePage>
      </body>
    </html>
  )
}
