import React from 'react'

export interface PageTitleProps {
  title: string
  className?: string
}

function PageTitle({ title, className }: PageTitleProps) {
  return <h1 className={`text-header-100 max-w-[314px] uppercase md:max-w-none ${className}`}>{title}</h1>
}

export default PageTitle
