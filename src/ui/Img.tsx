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

  function isNeedFillProp() {
    if ('fill' in props) return props.fill

    if (isSVG) return true
    if ('width' in props) return true

    return false
  }

  return (
    <Image
      src={image}
      alt={alt}
      unoptimized={isNeedUnoptimized()}
      onError={onError}
      placeholder='blur'
      blurDataURL='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0K82vBwADvgGjnPCFpAAAAABJRU5ErkJggg=='
      role={isDecorative ? 'presentation' : undefined}
      {...Object.assign(props, { fill: isNeedFillProp() })}
    />
  )
}

export default Img
