import React, { PropsWithChildren } from 'react'
import Footer from '@/layout/Footer'
import Header from '@/layout/Header/Header'
import { AdaptiveProvider } from '@/features/adaptive'
import { basePageProps } from '@/globals/pageProps'
import StyleStates from '@/features/styleStates'

function BasePage({ children }: PropsWithChildren) {
  const baseProps = basePageProps()

  return (
    <AdaptiveProvider viewport={baseProps.viewport}>
      <StyleStates />
      <Header />
      <div>
        <main>{children}</main>
        <Footer />
      </div>
    </AdaptiveProvider>
  )
}

export default BasePage
