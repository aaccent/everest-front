import { ComplexPage } from '@/types/Page'
import { getYears } from '@/globals/api/methods/catalog-details/getYears'
import { getBuildingProgress, Period } from '@/globals/api'

async function convertToList(raw: Period, complexCode: string) {
  const start = new Date(raw.dateFrom).getFullYear()
  const end = new Date(raw.dateTo).getFullYear()
  const list: string[] = []

  for (let year = start; year <= end; year += 1) {
    const yearPeriod: Period = {
      dateFrom: `${year}-01-01`,
      dateTo: `${year}-12-31`,
    }
    const yearPhotos = await getBuildingProgress({ complexCode, ...yearPeriod })

    if (yearPhotos.length) list.push(year.toString())
  }

  return list
}

export async function GET(request: Request, { params }: ComplexPage) {
  const rawData = await getYears(params.complex)
  const data = await convertToList(rawData, params.complex)
  return Response.json(data)
}
