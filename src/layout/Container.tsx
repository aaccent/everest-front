import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  className?: string
}

function Container({ className, children }: Props) {
  return <div className={`mx-auto max-w-[1568px] ${className}`}>{children}</div>
}

export default Container
