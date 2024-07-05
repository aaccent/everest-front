import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  /** @description Классы секции. Для смены заднего фона используй [containerClassName]{@link containerClassName} */
  className?: string
  containerClassName: string
}
export default function Section({ children, className, containerClassName }: Props) {
  return (
    <section className={`px-container my-[72px] md:my-[160px] md:px-[56px] ${className}`}>
      <div className={`mx-auto max-w-[1568px] ${containerClassName}`}>{children}</div>
    </section>
  )
}
