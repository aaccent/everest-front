const PRICE_PLACEHOLDER = 'нет цены'

type RawPrice = number | string | null | undefined

/**
 * Конвертирует `rawPrice` в число через {@link parseInt}
 * @return В зависимости от типа `rawPrice`:
 * * `undefined` или `null` - возвращает `null`.
 * * `number` - возвращает `rawPrice`.
 * * `string` - конвертирует через {@link parseInt},
 * если результат конвертации `NaN` - возвращает `null`,
 * иначе результат конвертации.
 */
function safeConvertToNumber(rawPrice: RawPrice) {
  if (typeof rawPrice === 'number') return rawPrice
  if (!rawPrice) return null

  const price = parseInt(rawPrice)
  if (Number.isNaN(price)) return null

  return price
}

/**
 * Форматирование `price` для вывода вида `5.5 млн ₽` или `50 тыс ₽`
 * @param rawPrice Любой примитивный тип. Переданный тип преобразуется в нужный для работы функции.
 * Безопасно работает с пустыми и неопределенными значениями
 * @return В зависимости от типа `price`:
 * * `undefined` или `null` - возвращает [заглушку]{@link PRICE_PLACEHOLDER}.
 * * `string` - конвертирует через [parseInt()]{@link parseInt},
 * если результат конвертации `NaN` - возвращает [заглушку]{@link PRICE_PLACEHOLDER},
 * иначе форматированную строку.
 * * `number` - возвращает форматированную строку.
 */
export function formatPriceShort(rawPrice: RawPrice) {
  const price = safeConvertToNumber(rawPrice)
  if (price === undefined || price === null) return PRICE_PLACEHOLDER

  const digits = price.toString().length

  if (digits <= 6) {
    return `${Math.trunc(price / 1000)} тыс ₽`
  }

  let shortPrice = parseFloat((price / 1_000_000).toFixed(1))
  if (shortPrice % 1 == 0) {
    shortPrice = Math.trunc(shortPrice)
  }

  return `${shortPrice} млн ₽`
}

/**
 * Форматирование `price` для вывода вида `5 000 000 ₽`
 * @return - Описано в {@link formatPriceShort}
 */
export function formatFullPrice(price: RawPrice) {
  const _price = safeConvertToNumber(price)
  if (!_price) return PRICE_PLACEHOLDER

  const intl = new Intl.NumberFormat('ru-ru', { currency: 'RUB', style: 'currency', maximumFractionDigits: 0 })

  return intl.format(_price)
}

/**
 * Форматирование `price` для вывода вида `5 000 000 ₽ / м^2`.
 * `^2` вставляется юникод символом `\u00b2`.
 * @return Описано в {@link formatPriceShort}
 */
export function formatPriceForArea(price: RawPrice) {
  const fullPrice = formatFullPrice(price)
  return `${fullPrice} / м\u00B2`
}

export function formatPriceForRange(value: number): number {
  const digits = Math.trunc(Number(value)).toString().length
  if (digits > 6) {
    return value / 1_000_000
  } else if (digits > 3) {
    return value / 1_000
  } else return value
}

export function formatShortSinglePrice(value: number): string {
  const digits = Math.trunc(Number(value)).toString().length
  if (digits > 6) {
    return `${value / 1_000_000} млн`
  } else if (digits > 3) {
    return `${value / 1_000} тыс`
  } else return value.toString()
}
