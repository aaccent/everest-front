'use client'

import { useState } from 'react'
import Img from '@/ui/Img'

const testGallery = ['/slider-1.png', '/slider-2.png', '/slider-3.png']

function Gallery() {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const cols = testGallery.length + 1

  function showImages() {
    return testGallery.map((image, index) => (
      <Img
        src={image}
        key={index}
        width={512}
        height={340}
        className={`absolute inset-0 h-full object-cover object-center opacity-0 ${activeImageIndex === index ? 'opacity-100' : ''}`}
      />
    ))
  }

  return (
    <div className='relative h-[310px] w-full max-w-[350px] overflow-hidden rounded-[16px] md:h-[340px] md:max-w-[512px]'>
      <div className={`relative grid h-full w-full grid-cols-${cols} z-10`}>
        {new Array(testGallery.length + 1).map((_, index) => (
          <div
            key={index}
            onMouseEnter={() => {
              setActiveImageIndex(index)
            }}
          ></div>
        ))}
      </div>

      {showImages()}
    </div>
  )
}

export default Gallery
