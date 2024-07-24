'use client'
import React, { useState } from 'react'
import Image, { ImageProps } from 'next/image'

import NoPhoto from '@/assets/static/no-photo.jpg'

type Props = (Pick<ImageProps, 'fill'> | Pick<ImageProps, 'width' | 'height'>) &
  Pick<ImageProps, 'quality' | 'className'> & {
    src: ImageProps['src'] | null
    isSVG?: boolean
    alt?: string
    isDecorative?: boolean
  }

function Img({ isSVG, src, isDecorative, alt = '', ...props }: Props) {
  const [image, setImage] = useState<ImageProps['src']>(src || NoPhoto)

  function onError() {
    setImage(NoPhoto)
  }

  function isNeedUnoptimized() {
    if (isSVG !== undefined) return isSVG
    if (typeof image !== 'string') return undefined

    return image.includes('.svg')
  }

  return (
    <Image
      src={image}
      alt={alt}
      unoptimized={isNeedUnoptimized()}
      onError={onError}
      placeholder='blur'
      role={isDecorative ? 'presentation' : undefined}
      {...props}
    />
  )
}

export default Img
