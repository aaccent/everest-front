type ArrayWithNNumbers<N extends number, TArr extends number[] = [number]> = TArr['length'] extends N
  ? TArr
  : ArrayWithNNumbers<N, [...TArr, number]>
/* Mapbox имеет зум от 0 до 22 - 23 значения.
Радиус задан вручную с помощью линейки с Я.Карт */
const RADIUS_MAP: ArrayWithNNumbers<23> = [
  15000, 10000, 5000, 2000, 2000, 2000, 1000, 300, 140, 68, 34, 16, 9, 5, 2, 1, 1, 1, 1, 1, 1, 1, 1,
]

export function convertZoomInRadius(zoom: number) {
  return RADIUS_MAP[zoom]
}
