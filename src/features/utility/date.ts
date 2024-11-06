import { DateString } from '@/types/Date'

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

/** Выводит дату вида `12 февраля 2022` */
export function formatLongDate(timestamp: Timestamp): string {
  if (!timestamp) return 'неизвестно'

  const date = new Date(timestamp)

  // TODO: Скорее всего он не учитывает часовой пояс
  const formatter = new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    year: 'numeric',
    day: '2-digit',
  })

  return (
    formatter
      // Получаем составные части даты.
      .formatToParts(date)
      // Без изменений мы получаем дату вида 29 октября 2024 г.
      // Пробелы (" ") и год (" г.") являются literal частью даты.
      // Если встречается literal, то заменяем на пробел (" ")
      .map(({ type, value }) => {
        if (type === 'literal') return ' '

        return value
      })
      .join('')
      .trim()
  )
}

export type Timestamp = DateString | number | string | null | undefined

export function formatStatusByQuarter(timestamp: Timestamp) {
  if (!timestamp) return 'неизвестно'

  // TODO: Скорее всего он не учитывает часовой пояс
  const date = new Date(timestamp)
  const quarter = Math.floor((date.getMonth() + 3) / 3)
  const year = date.getFullYear()
  const quarterRoman = convertToRoman(quarter)
  return `${quarterRoman} кв. ${year} год`
}

export function formatStatusInComplexCard(timestamp: Timestamp) {
  if (!timestamp)
    return {
      text: 'неизвестно',
      giveAway: false,
    }

  const date = new Date(timestamp)
  const nowDate = new Date()
  if (nowDate > date)
    return {
      giveAway: true,
      text: 'Выдача ключей',
    }

  return {
    giveAway: false,
    text: formatStatusByQuarter(timestamp),
  }
}

export function formatStatusExtended(timestamp: Timestamp) {
  if (!timestamp) return null

  // TODO: Скорее всего он не учитывает часовой пояс
  const date = new Date(timestamp)
  const now = new Date()

  if (date >= now)
    return {
      giveAway: true,
      text: 'Выдача ключей',
    }

  const dateStr = formatLongDate(timestamp)

  return {
    giveAway: false,
    text: `Сдача ${dateStr}`,
  }
}

/**
 * Выводит дату вида дд.мм.гггг
 * @param timestamp - Вид временной метки должен быть валиден для [Date]{@link Date} конструктора
 */
export function formatDate(timestamp: Timestamp): string {
  if (!timestamp) return 'неизвестно'

  // TODO: Скорее всего он не учитывает часовой пояс
  const date = new Date(timestamp)
  return `${getMonthDay(date)}.${getMonth(date)}.${date.getFullYear()}`
}
