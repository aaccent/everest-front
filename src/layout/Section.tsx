import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  /** @description Классы секции. Для смены заднего фона используй [containerClassName]{@link containerClassName} */
  className?: string
  containerClassName: string
}
export default function Section({ children, className, containerClassName }: Props) {
  return (
    <section className={`my-[72px] px-container md:my-[160px] md:px-[56px] ${className}`}>
      <div className={`max-w-[1568px] mx-auto ${containerClassName}`}>{children}</div>
    </section>
  )
}
