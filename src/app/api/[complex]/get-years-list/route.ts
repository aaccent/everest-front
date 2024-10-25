import { ComplexPage } from '@/types/Page'
import { getYears } from '@/globals/api/methods/catalog-details/getYears'
import { Period } from '@/globals/api'

function convertToList(raw: Period) {
  const start = new Date(raw.dateFrom).getFullYear()
  const end = new Date(raw.dateTo).getFullYear()
  const list: string[] = []

  for (let i = start; i <= end; i += 1) {
    list.push(i.toString())
  }

  return list
}

export async function GET(request: Request, { params }: ComplexPage) {
  const rawData = await getYears(params.complex)
  const data = convertToList(rawData)
  return Response.json(data)
}
