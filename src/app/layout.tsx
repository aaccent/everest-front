import type { Metadata } from 'next'
import { Geologica } from 'next/font/google'
import localFont from 'next/font/local'
import '@/styles/globals.css'
import Footer from '@/layout/Footer/Footer'

const geologica = Geologica({
  display: 'swap',
  variable: '--font-geologica',
  subsets: ['cyrillic', 'latin'],
  adjustFontFallback: false,
})

const coolvetica = localFont({
  src: [
    {
      path: '../assets/fonts/coolvetica-condensed-rg.woff',
    },
    {
      path: '../assets/fonts/coolvetica-condensed-rg.woff2',
    },
  ],
  display: 'swap',
  variable: '--font-coolvetica',
})

export const metadata: Metadata = {
  title: 'Everest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body className={`${geologica.variable} ${coolvetica.variable} font-geologica`}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
