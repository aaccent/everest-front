import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  className?: string
  onClick?: () => void
}

/**
 * Для корректного отображения слайдов нужно обернуть их в {@link CarouselInner}.
 * ```jsx
 * <Carousel>
 *   <CarouselInner>
 *     <CarouselSlide>some slide 1</CarouselSlide>
 *     <CarouselSlide>some slide 2</CarouselSlide>
 *   </CarouselInner>
 * </Carousel>
 * ```
 *  */
export function CarouselSlide(props: Props) {
  return (
    <div className={`slide shrink-0 grow-0 basis-full ${props.className}`} onClick={props.onClick}>
      {props.children}
    </div>
  )
}
