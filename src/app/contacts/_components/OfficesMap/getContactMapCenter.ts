import { MapCenter } from '@/types/Map'
import { LngLatBounds } from 'mapbox-gl'
import { MapViewState } from '@/components/CustomMap'

type ObjectWithCoords = object & MapCenter

export function getContactMapCenter(objects: ObjectWithCoords[]): MapViewState {
  const initBounds = objects.reduce((bounds, object) => {
    return bounds.extend({ lat: object.latitude, lng: object.longitude })
  }, new LngLatBounds())

  return {
    latitude: initBounds.getCenter().lat,
    longitude: initBounds.getCenter().lng,
    zoom: 13,
  }
}
