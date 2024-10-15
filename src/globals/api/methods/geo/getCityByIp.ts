import { headers } from 'next/headers'
import { EXAMPLE_IP } from '@/middleware'

const DADATA_URL = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?language=ru&ip='

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Token ' + process.env.DADATA_TOKEN,
  },
}

export async function getCityByIp(): Promise<string> {
  const ip = (headers().get('x-forwarded-for') ?? EXAMPLE_IP).split(',')[0]

  const url = DADATA_URL + ip
  return await fetch(url, options)
    .then((response) => response.json())
    .then((result) => result.location.value)
    .catch((error) => {
      console.error(error)
      return 'unknown'
    })
}
