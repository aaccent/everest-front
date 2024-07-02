import React, { PropsWithChildren } from 'react'
import Footer from '@/layout/Footer'
import Header from '@/layout/Header/Header'

function BasePage({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <div>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default BasePage
