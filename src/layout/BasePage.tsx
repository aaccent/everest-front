import React, { PropsWithChildren } from 'react'
import Footer from '@/layout/Footer'
import Header from '@/layout/Header/Header'
import { AdaptiveProvider } from '@/features/adaptive'
import { basePageProps } from '@/globals/pageProps'

async function BasePage({ children }: PropsWithChildren) {
  const baseProps = await basePageProps()

  return (
    <AdaptiveProvider viewport={baseProps.viewport}>
      <Header />
      <div>
        <main>{children}</main>
        <Footer />
      </div>
    </AdaptiveProvider>
  )
}

export default BasePage
