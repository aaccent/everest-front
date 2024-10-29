import { Period } from '@/globals/api'

export async function getAlbums(complexCode: string, activeQuarter: Period) {
  return await fetch(`/api/${complexCode}/get-albums?quarter=${JSON.stringify(activeQuarter)}`).then((res) =>
    res.json(),
  )
}
