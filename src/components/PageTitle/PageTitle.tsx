import React from 'react'
import Link from 'next/link'
import Container from '@/layout/Container'

export interface PageTitleProps {
  breadcrumbs: string[]
  title: string
}

function PageTitle(props: PageTitleProps) {
  function showBreadcrumbs() {
    return (
      <>
        <Link className={`text-base-500-reg-200 text-base-650`} href={'/'}>
          Главная
        </Link>
        {props.breadcrumbs.map((breadcrumb, index) => (
          <Link
            key={index}
            href={''}
            className={`text-base-500-reg-200 flex items-center gap-[6px] text-base-650 before:block before:h-[16px] before:w-[20px] before:bg-icon-full-arrow before:opacity-50 before:bg-default-contain last:text-primary last:before:opacity-100 last:before:filter-primary`}
          >
            {breadcrumb}
          </Link>
        ))}
      </>
    )
  }

  return (
    <Container>
      <div className={`mt-[17.5px] md:mt-[27px]`}>
        <div className={`mb-[30px] flex items-center gap-[6px] md:mb-[40px]`}>{showBreadcrumbs()}</div>
        <div className={`text-header-100 max-w-[314px] uppercase md:max-w-none`}>{props.title}</div>
      </div>
    </Container>
  )
}

export default PageTitle
