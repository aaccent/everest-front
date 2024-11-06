import React from 'react'
import Carousel, {
  CarouselInner,
  CarouselProgressBar,
  CarouselSlide,
  CarouselWhiteNavigations,
} from '@/components/Carousel/Carousel'
import Img from '@/ui/Img'
import { DetailComplex } from '@/types/catalog/Complex'
import { DecorativeBlock } from '@/layout/DecorativeSection'
import DetailedInfo from '@/app/catalog/complexes/[complex]/_components/DetailedInfo'

function showSlides(images: string[]) {
  const _images = images.length ? images : ['/slider-1.png', '/slider-2.png', '/slider-3.png']
  return _images.map((img, index) => (
    <CarouselSlide className='h-[673px] w-full overflow-hidden rounded-[20px] md:h-[780px]' key={index}>
      <Img src={img} width={1568} height={780} className='size-full object-cover object-center' />
    </CarouselSlide>
  ))
}

interface Props {
  complex: DetailComplex
}

function PageSlider({ complex }: Props) {
  return (
    <DecorativeBlock id='about'>
      <Carousel className='overflow-hidden' fade>
        <CarouselInner>{showSlides(complex.gallery)}</CarouselInner>
        <CarouselProgressBar className='inset-x-[60px] top-[-32px] *:bg-base-100 md:w-[230px]' perView={1} />
        <CarouselWhiteNavigations className='hidden md:flex' />
        <DetailedInfo complex={complex} />
      </Carousel>
    </DecorativeBlock>
  )
}

export default PageSlider
