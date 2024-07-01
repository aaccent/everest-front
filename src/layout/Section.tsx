import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  className?: string
  containerClassName: string
}
export default function Section({ children, className, containerClassName }: Props) {
  return (
    <section className={`my-[72px] px-[20px] md:my-[160px] md:px-[56px] ${className}`}>
      <div className={`max-w-[1568px] mx-auto ${containerClassName}`}>{children}</div>
    </section>
  )
}
