import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  className?: string
}

function Container({ className, children }: Props) {
  return <div className={`px-container max-w-[1568px] md:mx-auto md:px-0 ${className}`}>{children}</div>
}

export default Container
