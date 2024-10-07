import React, { PropsWithChildren } from 'react'
import Footer from '@/layout/Footer/Footer'
import Header from '@/layout/Header/Header'
import { AdaptiveProvider } from '@/features/adaptive'
import { basePageProps } from '@/globals/pageProps'
import { PopupProvider } from '@/features/Popup'

import packageJSON from '@/../package.json'
import ContactForm from '@/components/ContactForm/ContactForm'
import { CityContextProvider } from '@/globals/CityContext'

function BasePage({ children }: PropsWithChildren) {
  const baseProps = basePageProps()

  return (
    <AdaptiveProvider viewport={baseProps.viewport}>
      <span id='app-version' className='absolute hidden'>
        {'v' + packageJSON.version}
      </span>
      <CityContextProvider>
        <PopupProvider>
          <Header />
          <div className='flex min-h-screen w-full flex-col justify-between'>
            <main className='h-full flex-[1_1_0]'>
              {children}
              <ContactForm />
            </main>
            <Footer />
          </div>
        </PopupProvider>
      </CityContextProvider>
    </AdaptiveProvider>
  )
}

export default BasePage
