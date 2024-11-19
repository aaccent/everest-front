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
  return images.map((img, index) => (
    <CarouselSlide className='h-[673px] w-full overflow-hidden rounded-[20px] md:h-[780px]' key={index}>
      <Img src={img} width={1568} height={780} className='size-full object-cover object-center' />
    </CarouselSlide>
  ))
}

const tempGallery = ['/no-photo.jpg', '/no-photo.jpg', '/no-photo.jpg']

interface Props {
  complex: DetailComplex
}

export const ABOUT_ID = 'about'

function PageSlider({ complex }: Props) {
  return (
    <DecorativeBlock id={ABOUT_ID}>
      <Carousel className='overflow-hidden' fade>
        <CarouselInner>
          {!!complex.gallery?.length ? showSlides(complex.gallery) : showSlides(tempGallery)}
        </CarouselInner>
        <CarouselProgressBar className='inset-x-[60px] top-[-32px] *:bg-base-100 md:w-[230px]' perView={1} />
        <CarouselWhiteNavigations className='hidden md:flex' />
      </Carousel>
      <DetailedInfo complex={complex} />
    </DecorativeBlock>
  )
}

export default PageSlider
