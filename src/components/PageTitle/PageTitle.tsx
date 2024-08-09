import React from 'react'

export interface PageTitleProps {
  title: string
}

function PageTitle({ title }: PageTitleProps) {
  return <h1 className='text-header-100 max-w-[314px] uppercase md:max-w-none'>{title}</h1>
}

export default PageTitle
