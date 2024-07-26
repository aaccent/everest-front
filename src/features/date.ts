export function convertToRoman(num: number): string {
  switch (num) {
    case 1:
      return 'I'
    case 2:
      return 'II'
    case 3:
      return 'III'
    case 4:
      return 'IV'
    default:
      return ''
  }
}

export function formatStatus(timestamp: number | null | undefined) {
  if (!timestamp) return 'неизвестно'

  const date = new Date(timestamp)
  const quarter = Math.floor((date.getMonth() + 3) / 3)
  const year = date.getFullYear()
  const quarterRoman = convertToRoman(quarter)
  return `${quarterRoman} кв. ${year} год`
}
