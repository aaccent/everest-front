import { RangeValue } from '@/ui/inputs/Range'

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
function safeConvertToPriceNumber(rawPrice: RawPrice) {
  if (typeof rawPrice === 'number') return rawPrice
  if (!rawPrice) return null

  const price = parseInt(rawPrice)
  if (Number.isNaN(price)) return null

  return price
}

/**
 * Форматирование `price` для вывода вида `от 5.5 млн ₽` или `5.5` если `onlyNumbers` будет `true`
 * @param price Любой примитивный тип
 * @param onlyNumbers  вернуть только цифры без единицы измерения и валюты.
 * Переданный тип преобразуется в нужный для работы функции.
 * Безопасно работает с пустыми и неопределенными значениями
 * @return В зависимости от типа `price`:
 * * `undefined` или `null` - возвращает [заглушку]{@link PRICE_PLACEHOLDER}.
 * * `string` - конвертирует через [parseInt()]{@link parseInt},
 * если результат конвертации `NaN` - возвращает [заглушку]{@link PRICE_PLACEHOLDER},
 * иначе форматированную строку.
 * * `number` - возвращает форматированную строку.
 */
export function formatPriceShortBy(price: RawPrice, onlyNumbers = false) {
  const _price = safeConvertToPriceNumber(price)
  if (_price === undefined || _price === null) return PRICE_PLACEHOLDER
  let shortPrice = (_price / 1000000).toFixed(2)
  return onlyNumbers ? `${shortPrice}` : `от ${shortPrice} млн ₽`
}

/**
 * Форматирование `price` для вывода вида `5 000 000 ₽`
 * @param price - Описано в {@link formatPriceShortBy}
 * @return - Описано в {@link formatPriceShortBy}
 */
export function formatFullPrice(price: RawPrice) {
  const _price = safeConvertToPriceNumber(price)
  if (!_price) return PRICE_PLACEHOLDER

  const intl = new Intl.NumberFormat('ru-ru', { currency: 'RUB', style: 'currency', maximumFractionDigits: 0 })

  return intl.format(_price)
}

/**
 * Форматирование `price` для вывода вида `5 000 000 ₽ / м^2`.
 * `^2` вставляется юникод символом `\u00b2`.
 * @param price - Описано в {@link formatPriceShortBy}
 * @return Описано в {@link formatPriceShortBy}
 */
export function formatPriceForArea(price: RawPrice) {
  const fullPrice = formatFullPrice(price)
  return `${fullPrice} / м\u00B2`
}

export function formatPriceShort(rawPrice: RawPrice) {
  const price = safeConvertToPriceNumber(rawPrice)
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

export function formatLongPriceForRange(value: RangeValue): RangeValue {
  return [value[0] * 1_000_000, value[1] * 1_000_000]
}

export function formatShortPriceObjForRange(value: RangeValue): RangeValue {
  return [+(value[0] / 1_000_000).toFixed(1), +(value[1] / 1_000_000).toFixed(1)]
}

export function formatShortPriceArrForRange(value: [number, number]): number[] {
  return value.map((v) => +(v / 1_000_000).toFixed(1))
}
