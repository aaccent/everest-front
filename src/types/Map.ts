export interface MapCenter {
  longitude: number
  latitude: number
}

export type CategoryLocation =
  | {
      center?: never
      radius?: never
    }
  | {
      center: MapCenter
      radius: number
    }
