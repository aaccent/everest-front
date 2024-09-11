'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import Img from '@/ui/Img'
import { CarouselSlide } from '@/components/Carousel/CarouselSlide'
import Carousel, { CarouselContext, CarouselInner } from '@/components/Carousel/Carousel'
import { EmblaCarouselType } from 'embla-carousel'

const testGallery = ['/slider-1.png', '/slider-2.png', '/slider-3.png']

interface GridsProps {
  onMouseEnter: (index: number) => void
}

function Grids({ onMouseEnter }: GridsProps) {
  const cols = testGallery.length + 1
  const { emblaApi } = useContext(CarouselContext)

  const onMouseEnterHandle = (index: number) => {
    onMouseEnter(index)
    emblaApi?.scrollTo(index)
  }

  return (
    <div className={`absolute inset-0 hidden md:grid grid-cols-${cols} z-20 size-full`}>
      {testGallery.map((_, index) => (
        <div key={index} onMouseEnter={() => onMouseEnterHandle(index)} />
      ))}
      <div onMouseEnter={() => onMouseEnterHandle(testGallery.length)} />
    </div>
  )
}

interface ThumbsProps {
  onActiveImage: (index: number) => void
}

function Thumbs({ onActiveImage }: ThumbsProps) {
  const { emblaApi } = useContext(CarouselContext)
  const [thumbs, setThumbs] = useState<number[] | undefined>(emblaApi?.scrollSnapList())
  const [activeThumbIndex, setActiveThumbIndex] = useState(0)

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setThumbs(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      setActiveThumbIndex(emblaApi.selectedScrollSnap())
      onActiveImage(emblaApi.selectedScrollSnap())
    },
    [onActiveImage],
  )

  useEffect(() => {
    if (!emblaApi) return
    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return thumbs?.map((_, index) => (
    <div
      key={index}
      className={`h-[2px] w-[40px] rounded-[2px] bg-base-100 ${activeThumbIndex === index ? 'opacity-100' : 'opacity-50'} `}
    />
  ))
}

function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  function showImages() {
    return (
      <>
        {testGallery.map((image, index) => (
          <CarouselSlide key={index}>
            <Img src={image} key={index} width={512} height={340} className='size-full object-cover object-center' />
          </CarouselSlide>
        ))}
        <CarouselSlide>
          <div className='relative size-full'>
            <Img
              src={testGallery[testGallery.length - 1]}
              width={512}
              height={340}
              className='size-full object-cover object-center'
            />
            <div className='absolute inset-0 z-10 flex size-full items-center justify-center bg-gradient-to-b from-[#000]/[.3] to-[#000]/[.35]'>
              <button className='text-base-200-lg-100 flex flex-col items-center gap-[12px] text-base-100 before:block before:size-[80px] before:-rotate-45 before:rounded-full before:bg-base-100 before:bg-icon-full-arrow before:bg-default-auto'>
                Ещё 23 фото
              </button>
            </div>
          </div>
        </CarouselSlide>
      </>
    )
  }

  return (
    <>
      <Carousel
        className={`relative h-[248px] w-full max-w-[350px] overflow-hidden rounded-[16px] md:h-[340px] md:max-w-[512px] ${activeIndex === testGallery.length ? 'z-20' : ''}`}
        fade
      >
        <Grids onMouseEnter={setActiveIndex} />
        <CarouselInner>{showImages()}</CarouselInner>
        <div className='absolute bottom-[20px] z-20 flex w-full items-center justify-center gap-[10px]'>
          <Thumbs onActiveImage={setActiveIndex} />
        </div>
      </Carousel>
    </>
  )
}

export default Gallery
