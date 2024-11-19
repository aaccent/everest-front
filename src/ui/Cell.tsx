import React from 'react'

export type CellProps = {
  className?: string
  content: string | number
}

function Cell({ className, content }: CellProps) {
  return <td className={className}>{content}</td>
}

export default Cell
