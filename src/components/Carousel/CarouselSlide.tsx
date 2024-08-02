import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  className?: string
}

/**
 * @description Для корректного отображения слайдов нужно обернуть их в {@link CarouselInner}.
 * @example
 * ```jsx
 * <CarouselInner>
 *   <CarouselSlide>some slide 1</CarouselSlide>
 *   <CarouselSlide>some slide 2</CarouselSlide>
 * </CarouselInner>
 * ```
 *  */
export function CarouselSlide(props: Props) {
  return <div className={`slide shrink-0 grow-0 basis-full ${props.className}`}>{props.children}</div>
}
