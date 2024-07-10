import { PropsWithChildren } from 'react'
import Container from '@/layout/Container'

interface Props extends PropsWithChildren {
  /** @description Классы секции. Для смены заднего фона используй [containerClassName]{@link containerClassName} */
  className?: string
  containerClassName?: string
  hideContainer?: boolean
}

export default function Section({ children, hideContainer, className, containerClassName }: Props) {
  return (
    <section className={`px-container my-[72px] first:mt-0 last:mb-0 md:my-[160px] md:px-[56px] ${className}`}>
      {hideContainer ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  )
}
