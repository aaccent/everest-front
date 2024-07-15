import React, { PropsWithChildren } from 'react'
import Footer from '@/layout/Footer/Footer'
import Header from '@/layout/Header/Header'
import { AdaptiveProvider } from '@/features/adaptive'
import { basePageProps } from '@/globals/pageProps'
import StyleStates from '@/features/styleStates'
import { PopupProvider } from '@/components/Popup/Popup'

function BasePage({ children }: PropsWithChildren) {
  const baseProps = basePageProps()

  return (
    <AdaptiveProvider viewport={baseProps.viewport}>
      <StyleStates />
      <PopupProvider>
        <Header />
        <div className='flex min-h-screen w-full flex-col justify-between'>
          <main className='h-full flex-[1_1_0]'>{children}</main>
          <Footer />
        </div>
      </PopupProvider>
    </AdaptiveProvider>
  )
}

export default BasePage
