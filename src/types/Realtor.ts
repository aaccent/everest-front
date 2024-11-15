import { Social } from '@/types/Socials'

export interface RealtorDetailed {
  name: string
  h1?: string | null
  title?: string | null
  description?: string | null
  image?: string | null
  mobileImage?: string | null
  position: string
  params: {
    city: string
    experience: string
  }
  tel: string
  email: string
  socials?: Social[] | null
}

export interface RealtorCardType {
  id: number
  name: string
  position: string
  tel: string
  image: string | null
  code: string
}
