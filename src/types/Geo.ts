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

export type Office = {
  id: number
  address: string
  email: string
  phone: string
  photo: string | null
  work_week_day_from: string
  work_week_day_to: string
  work_time_from: string
  work_time_to: string
  latitude: number
  longitude: number
  city: {
    id: number
    name: string
    latitude: number
    longitude: number
  }
}
