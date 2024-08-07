import React from 'react'

interface RowProps {
  className?: string
  children?: React.ReactNode
  onClick?: () => void
}

function Row({ className, children, onClick }: RowProps) {
  return (
    <tr className={className} onClick={onClick}>
      {children}
    </tr>
  )
}

export default Row
