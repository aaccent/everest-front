'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { IsDesktop, IsMobile } from '@/features/adaptive'

interface CarouselInSlideProps {
  photos: string[]
  photoAmount: number
  tags: string[]
}

function CarouselInSlide(props: CarouselInSlideProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)
  const [lastSlideIndex, setLastSlideIndex] = useState<number | null>(null)

  const slides = props.photos.length > 3 ? props.photos.slice(0, 3) : props.photos.slice()
  const slideParts = props.photos.length > 3 ? 4 : props.photos.length

  const onMouseEnter = (index: number) => {
    setActiveSlideIndex(index)
  }

  const onLastSlideEnter = () => {
    setLastSlideIndex(activeSlideIndex)
  }

  function activeImgClass(index: number) {
    return activeSlideIndex === index ? 'opacity-1' : 'opacity-0'
  }

  function showPart() {
    if (slideParts === 4) {
      return (
        <>
          {slides.map((slide, index) => (
            <div className={`${index + 1}`} onMouseOver={(e) => onMouseEnter(index)} key={index}></div>
          ))}
          <div onMouseOver={onLastSlideEnter} onMouseLeave={() => setLastSlideIndex(null)}></div>
        </>
      )
    } else {
      return slides.map((slide, index) => <div onMouseOver={() => onMouseEnter(index)} key={index}></div>)
    }
  }

  function Images() {
    return (
      <>
        <IsDesktop>
          {slides.map((slide, index) => {
            return (
              <div className={`absolute inset-0 ${activeImgClass(index)}`} key={index}>
                <Image
                  src={slide}
                  alt={''}
                  width={512}
                  height={340}
                  className={`absolute h-full w-full object-cover object-center`}
                />
              </div>
            )
          })}
        </IsDesktop>
        <IsMobile>
          <div className={`absolute inset-0`}>
            <Image
              src={props.photos[0]}
              alt={''}
              width={320}
              height={210}
              className={`absolute h-full w-full object-cover object-center`}
            />
          </div>
        </IsMobile>
      </>
    )
  }

  function LastIndexWrapper() {
    return (
      <div
        className={`pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-[12px] bg-base-600/35`}
      >
        <div className='flex size-[80px] items-center justify-center rounded-full bg-base-100 after:block after:size-[30px] after:rotate-45 after:bg-icon-arrow-up after:bg-cover after:bg-center after:filter-base-600'></div>
        <div className='text-base-200-lg-100 text-base-100'>{`Ещё ${props.photoAmount - 3} фото`}</div>
      </div>
    )
  }

  function PaginationButtons() {
    if (slideParts === 4) {
      return (
        <>
          {slides.map((_, index) => (
            <div className={`h-[2px] w-[40px] rounded-[2px] bg-base-100 ${ButtonClass(index)}`} key={index}></div>
          ))}
          <div className={`h-[2px] w-[40px] rounded-[2px] bg-base-100 ${ButtonClass(3)}`}></div>
        </>
      )
    } else {
      return (
        <>
          {slides.map((_, index) => (
            <div className={`h-[2px] w-[40px] rounded-[2px] bg-base-100 ${ButtonClass(index)}`} key={index}></div>
          ))}
        </>
      )
    }
  }

  function ButtonClass(index: number) {
    if (
      (index === activeSlideIndex && activeSlideIndex !== lastSlideIndex) ||
      (index === 3 && activeSlideIndex === lastSlideIndex)
    ) {
      return 'opacity-1'
    }
    return 'opacity-[0.5]'
  }

  function Wrapper() {
    return (
      <div className={`absolute inset-0 z-30 flex items-start justify-between p-[14px]`}>
        {props.tags.map((tag, index) => (
          <div
            className='text-base-400-lg-100 rounded-[10px] bg-base-100 px-[8px] py-[4.5px] md:px-[12px] md:py-[6.5px]'
            key={index}
          >
            {tag}
          </div>
        ))}
        <div className={`flex items-center gap-[4px]`}>
          <div
            className={`flex size-[36px] items-center justify-center rounded-full bg-base-650 after:block after:size-[20px] after:bg-icon-heart after:bg-auto after:bg-center after:filter-base-100 md:size-[64px]`}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <IsDesktop>
        <div className={`absolute inset-0 z-50 grid grid-cols-${slideParts}`}>{showPart()}</div>
        <div className='absolute bottom-[20px] left-[50%] z-30 flex -translate-x-[50%] gap-[10px]'>
          {PaginationButtons()}
        </div>
        {lastSlideIndex ? LastIndexWrapper() : Wrapper()}
      </IsDesktop>
      <IsMobile>{Wrapper()}</IsMobile>
      {Images()}
    </>
  )
}

export default CarouselInSlide
