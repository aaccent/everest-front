'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import Img from '@/ui/Img'
import { CarouselSlide } from '@/components/Carousel/CarouselSlide'
import Carousel, { CarouselContext, CarouselInner } from '@/components/Carousel/Carousel'
import { EmblaCarouselType } from 'embla-carousel'
import Link from 'next/link'

interface GridsProps {
  onMouseEnter: (index: number) => void
  onMouseLeave: () => void
  images: string[]
  link: string
  cols: number
}

function Grids({ onMouseEnter, onMouseLeave, images, link, cols }: GridsProps) {
  const galleryLink = link + '?gallery'
  const { emblaApi } = useContext(CarouselContext)

  const onMouseEnterHandle = (index: number) => {
    onMouseEnter(index)
    emblaApi?.scrollTo(index)
  }

  const onMouseLeaveHandle = () => {
    onMouseLeave()
    emblaApi?.scrollTo(0)
  }

  /**
   * `true` - с бека приходит информация о количество фотографий больше, чем показано в галерее карточки.
   * В этом случае последним будет слайд, который ведет на страницу объекта с открытой галереей
   *
   * `false` - количество слайдов будет равно количеству фотографий в массиве
   */
  const seeAllGridLink = cols !== images.length

  return (
    <div
      className={`absolute inset-0 hidden md:grid grid-cols-${cols} z-20 size-full`}
      onMouseLeave={() => onMouseLeaveHandle()}
    >
      {images.map((_, index) => (
        <Link href={link} className='block' key={index} onMouseEnter={() => onMouseEnterHandle(index)} />
      ))}
      {seeAllGridLink && <Link href={galleryLink} onMouseEnter={() => onMouseEnterHandle(images.length)} />}
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
      className={`h-[2px] w-[40px] rounded-[2px] bg-base-100 group-[.slider]:hidden group-[.slider]:md:block ${activeThumbIndex === index ? 'opacity-100' : 'opacity-50'} z-0`}
    />
  ))
}

interface GalleryProps {
  images: string[]
  count: number
  link: string
}

function Gallery({ images, count, link }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const onMouseLeaveHandle = () => {
    setActiveIndex(0)
  }

  function showImages() {
    return (
      <>
        {images.map((image, index) => (
          <CarouselSlide key={index}>
            <Img src={image} key={index} width={512} height={340} className='size-full object-cover object-center' />
          </CarouselSlide>
        ))}
        {count !== 0 && (
          <CarouselSlide>
            <div className='relative z-10 size-full'>
              <Img
                src={images[images.length - 1]}
                width={512}
                height={340}
                className='size-full object-cover object-center'
              />

              <div className='absolute inset-0 z-10 flex size-full items-center justify-center bg-gradient-to-b from-[#000]/[.3] to-[#000]/[.35]'>
                <button className='text-base-200-lg-100 flex flex-col items-center gap-[12px] text-base-100 before:block before:size-[80px] before:-rotate-45 before:rounded-full before:bg-base-100 before:bg-icon-full-arrow before:bg-default-auto'>{`Ещё ${count} фото`}</button>
              </div>
            </div>
          </CarouselSlide>
        )}
      </>
    )
  }

  return (
    <>
      <Carousel
        className={`relative h-[248px] w-full max-w-[350px] overflow-hidden rounded-[16px] group-[.slider]:hidden md:h-[340px] md:max-w-[512px] group-[.slider]:md:block ${activeIndex === images.length ? 'z-20' : ''}`}
        fade
      >
        <Grids
          onMouseEnter={setActiveIndex}
          images={images}
          cols={count ? images.length + 1 : images.length}
          onMouseLeave={() => onMouseLeaveHandle()}
          link={link}
        />
        <CarouselInner>{showImages()}</CarouselInner>
        <div className='absolute bottom-[20px] z-20 flex w-full items-center justify-center gap-[10px]'>
          <Thumbs onActiveImage={setActiveIndex} />
        </div>
      </Carousel>
      <div className='relative hidden h-[248px] w-full max-w-[350px] overflow-hidden rounded-[16px] group-[.slider]:block group-[.slider]:md:hidden'>
        <Img src={images[0]} width={512} height={340} className='size-full object-cover object-center' />
      </div>
    </>
  )
}

export default Gallery
