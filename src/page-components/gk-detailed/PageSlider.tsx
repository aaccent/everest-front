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

const tempGallery = ['/no-photo.jpg', '/no-photo.jpg', '/no-photo.jpg']

function PageSlider({ gallery }: PageSliderProps) {
  return (
    <>
      <Carousel className='overflow-hidden' fade>
        <CarouselInner>{!!gallery?.length ? showSlides(gallery) : showSlides(tempGallery)}</CarouselInner>
        <CarouselProgressBar className='inset-x-[60px] top-[-32px] *:bg-base-100 md:w-[230px]' />
        <CarouselWhiteNavigations className='hidden md:flex' />
      </Carousel>
    </>
  )
}

export default PageSlider
