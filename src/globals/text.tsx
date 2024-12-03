import React from 'react'

interface RenderHTMLProps {
  className?: string
}

export function renderHTML(rawHTML: string, props?: RenderHTMLProps) {
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML }, ...props })
}
