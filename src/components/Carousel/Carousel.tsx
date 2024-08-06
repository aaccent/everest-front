'use client'

import React, { createContext, PropsWithChildren, useContext } from 'react'
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'

interface CarouselContextObject {
  emblaApi: EmblaCarouselType | undefined
  emblaRef: UseEmblaCarouselType[0]
}

/** Нужен для передачи `emblaRef` и `emblaApi` в компоненты слайда, навигации, прогресса и другие. */
export const CarouselContext = createContext<CarouselContextObject>({} as CarouselContextObject)

/**
 * Контейнер для [CarouselSlide'ов]{@link CarouselSlide}.
 * Нужен из-за того, что [Слайды]{@link CarouselSlide} вставляются в один контейнер, а
 * [Кнопки навигации]{@link CarouselNavigations} и [Прогресс бар]{@link CarouselProgressBar}
 * вставляются во втором контейнере.
 *
 * Причина деления на все эти компоненты заключается
 * в возможности передавать конфигурацию связанную с навигацией и прогрессом.
 * Это позволяет использовать другие компоненты навигаций и прогресса.
 * Позволяет добавлять новый функционал с минимальными или вообще без изменения {@link Carousel}
 * */
export function CarouselInner({ children }: PropsWithChildren) {
  const { emblaRef } = useContext(CarouselContext)

  return (
    <div className='h-full md:overflow-hidden' ref={emblaRef}>
      <div className='flex h-full'>{children}</div>
    </div>
  )
}

type CarouselProps = EmblaOptionsType &
  PropsWithChildren & {
    className?: string
  }

/**
 * @description - Оборачивает детей в {@link CarouselContext}.
 *
 * Для корректного отображения слайдов нужно обернуть их в {@link CarouselInner}.
 *
 * Для добавления полосы прогресса используй {@link CarouselProgressBar}.
 *
 * Для добавления кнопок переключения используй {@link CarouselNavigations}.
 * ```jsx
 * <Carousel>
 *   <CarouselInner>
 *     <CarouselSlide>some slide</CarouselSlide>
 *   </CarouselInner>
 *   <CarouselNavigations />
 *   <CarouselProgressBar />
 * </Carousel>
 * ```
 *  */
export default function Carousel({ className, children, ...options }: CarouselProps) {
  const emblaOptions = Object.assign({ align: 'start' }, options)
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions)

  return (
    <CarouselContext.Provider value={{ emblaApi, emblaRef }}>
      <div className={className}>{children}</div>
    </CarouselContext.Provider>
  )
}

export * from './CarouselSlide'
export * from './CarouselNavigations'
export * from './CarouselProgressBar'
