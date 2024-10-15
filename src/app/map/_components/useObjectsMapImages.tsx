import { useCallback } from 'react'
import { MapRef } from 'react-map-gl'
import { Map } from 'mapbox-gl'

export const IMAGE_IDS = {
  MARKER_BG: 'marker-bg',
  MARKER_PRICE_BG: 'marker-price-bg',
  MARKER_PRICE_TEMP_BG: 'marker-price-test-bg',
}

interface LoadImageProps {
  map: MapRef
  imgId: string
  path: string
  imgOptions?: Parameters<Map['addImage']>[2]
}

function loadImage({ map, imgId, path, imgOptions }: LoadImageProps) {
  if (map.hasImage(imgId)) return

  map.loadImage(path, function (error, image) {
    if (error || !image) throw error

    map.addImage(imgId, image, imgOptions)
  })
}

/**
 * Хук нужен только для {@link ObjectsMap} и существует для упрощения чтения.
 * Отделяет логику добавления картинок в mapbox.
 */
export function useObjectsMapImages() {
  const mapRefCallback = useCallback((ref: MapRef | null) => {
    if (!ref) return
    const map = ref

    loadImage({
      map,
      imgId: IMAGE_IDS.MARKER_BG,
      path: '/map/marker-bg.png',
      imgOptions: {
        content: [40, 6, 62, 30],
        stretchX: [[40, 48]],
        stretchY: [[17, 19]],
      },
    })

    loadImage({
      map,
      imgId: IMAGE_IDS.MARKER_PRICE_BG,
      path: '/map/marker-price-bg.png',
      imgOptions: {
        content: [8, 4, 27, 22],
        stretchX: [[16, 19]],
        stretchY: [[12, 14]],
      },
    })

    loadImage({
      map,
      imgId: IMAGE_IDS.MARKER_PRICE_TEMP_BG,
      path: '/map/marker-price-temp-bg.png',
      imgOptions: {
        content: [8, 4, 27, 22],
        stretchX: [[16, 19]],
        stretchY: [[12, 14]],
      },
    })
  }, [])

  return { mapRefCallback }
}
