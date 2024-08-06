import { PropsWithChildren } from 'react'
import Container from '@/layout/Container'

interface Props extends PropsWithChildren {
  /** @description Классы секции. Для смены заднего фона используй [containerClassName]{@link containerClassName} */
  className?: string
  containerClassName?: string
  hideContainer?: boolean
  id?: string
}

export default function Section({ children, hideContainer, className, containerClassName, id }: Props) {
  return (
    <section className={`my-[72px] first:mt-0 last:mb-0 md:my-[160px] md:px-[56px] ${className}`} id={id}>
      {hideContainer ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  )
}
