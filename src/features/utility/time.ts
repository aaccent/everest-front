import { daysPlural, hoursPlural, minutesPlural, monthsPlural, weeksPlural } from '@/features/utility/pluralRules'

const MS_IN_MIN = 60_000
const MIN_IN_HOUR = 60
const HOURS_IN_DAY = 24
const DAYS_IN_WEEK = 7
const WEEKS_IN_MONTH = 4
const MONTH_IN_YEAR = 12

export function formatTime(time: string) {
  const now = Date.now()
  const publicationTime = new Date(time).getTime()

  if (now < publicationTime) return `только что`

  const min = Math.trunc((now - publicationTime) / MS_IN_MIN)
  if (min < MIN_IN_HOUR) return `${min} ${minutesPlural.get(min)} назад`

  const hours = Math.trunc(min / MIN_IN_HOUR)
  if (hours < HOURS_IN_DAY) return `${hours} ${hoursPlural.get(hours)} назад`

  const days = Math.trunc(hours / HOURS_IN_DAY)
  if (days < DAYS_IN_WEEK) return `${days} ${daysPlural.get(days)} назад`

  const weeks = Math.trunc(days / DAYS_IN_WEEK)
  if (weeks < WEEKS_IN_MONTH) return `${weeks} ${weeksPlural.get(weeks)} назад`

  const months = Math.trunc(weeks / WEEKS_IN_MONTH)
  if (months < MONTH_IN_YEAR) return `${months} ${monthsPlural.get(months)} назад`

  return `больше года назад`
}
