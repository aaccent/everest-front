export type Location = {
  id: string
  name: string
  slug: string
  cities: City[]
}

export type City = {
  id: string
  name: string
  latitude: number
  longitude: number
}
