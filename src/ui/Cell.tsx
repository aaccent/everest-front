import React from 'react'

export interface CellProps {
  className?: string
  thead?: boolean
  content: string | number
}

function Cell({ className, thead, content }: CellProps) {
  return thead ? <th className={className}>{content}</th> : <td className={className}>{content}</td>
}

export default Cell
