import React from 'react'
import Carousel, {
  CarouselInner,
  CarouselProgressBar,
  CarouselSlide,
  CarouselWhiteNavigations,
} from '@/components/Carousel/Carousel'
import Img from '@/ui/Img'
import { ComplexDetailed } from '@/types/Complex'

type PageSliderProps = Pick<ComplexDetailed, 'gallery'>

function showSlides(images: string[]) {
  return images.map((img, index) => (
    <CarouselSlide className='h-[673px] w-full overflow-hidden rounded-[20px] md:h-[780px]' key={index}>
      <Img src={img} width={1568} height={780} className='size-full object-cover object-center' />
    </CarouselSlide>
  ))
}

function PageSlider({ gallery }: PageSliderProps) {
  return (
    <>
      <Carousel className='overflow-hidden' fade>
        <CarouselInner>{!!gallery?.length && showSlides(gallery)}</CarouselInner>
        <CarouselProgressBar className='inset-x-[61px] top-[-32px] w-[228px]' />
        <CarouselWhiteNavigations className='hidden md:flex' />
      </Carousel>
    </>
  )
}

export default PageSlider
