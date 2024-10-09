/** Отдаёт месяц в формате мм. Добавляет '0' в начало если номер месяца меньше 10. */
function getMonth(date: Date): string {
  const month = date.getMonth() + 1
  return month < 10 ? `0${month}` : month.toString()
}

/** Отдаёт день в формате дд. Добавляет '0' в начало если число меньше 10. */
function getMonthDay(date: Date) {
  const day = date.getDate()
  return day < 10 ? `0${day}` : day.toString()
}

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

export function formatStatusByQuarter(timestamp: number | string | null | undefined) {
  if (!timestamp) return 'неизвестно'

  const date = new Date(timestamp)
  const quarter = Math.floor((date.getMonth() + 3) / 3)
  const year = date.getFullYear()
  const quarterRoman = convertToRoman(quarter)
  return `${quarterRoman} кв. ${year} год`
}

/**
 * Выводит дату вида дд.мм.гггг
 * @param timestamp - Вид временной метки должен быть валиден для [Date]{@link Date} конструктора
 */
export function formatDate(timestamp: string | number): string {
  const date = new Date(timestamp)
  return `${getMonthDay(date)}.${getMonth(date)}.${date.getFullYear()}`
}
