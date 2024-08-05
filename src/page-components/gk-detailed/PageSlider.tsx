import React from 'react'
import Carousel, { CarouselSlide } from '@/components/Carousel/Carousel'
import Img from '@/ui/Img'

function PageSlider() {
  const photos = ['/slider-1.png', '/slider-2.png', '/slider-3.png']
  const initProgress = 100 / photos.length / 100
  return (
    <>
      <Carousel
        progressBar
        progressClassName='top-[-32px] inset-x-[61px] w-[228px]'
        navigations='white'
        btnsCLassName='hidden md:flex'
        className='overflow-hidden'
        initProgress={initProgress}
        fade
      >
        {photos.map((photo, index) => (
          <CarouselSlide className='h-[673px] w-full overflow-hidden rounded-[20px] md:h-[780px]' key={index}>
            <Img src={photo} width={1568} height={780} className='size-full object-cover object-center' />
          </CarouselSlide>
        ))}
      </Carousel>
    </>
  )
}

export default PageSlider
