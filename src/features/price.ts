const PRICE_PLACEHOLDER = 'нет цены'

/**
 * Конвертирует `rawPrice` в число через {@link parseInt}
 * @return В зависимости от типа `rawPrice`:
 * * `undefined` или `null` - возвращает `null`.
 * * `number` - возвращает `rawPrice`.
 * * `string` - конвертирует через {@link parseInt},
 * если результат конвертации `NaN` - возвращает `null`,
 * иначе результат конвертации.
 */
function safeConvertToPriceNumber(rawPrice: number | string | undefined | null) {
  if (typeof rawPrice === 'number') return rawPrice
  if (!rawPrice) return null

  const price = parseInt(rawPrice)
  if (Number.isNaN(price)) return null

  return price
}

/**
 * Форматирование `price` для вывода вида `от 5.5 млн ₽` или 5.5 если true указан вторым аргументом
 * @param price Любой примитивный тип
 * @param onlyNumbers булево значение.
 * Переданный тип преобразуется в нужный для работы функции.
 * Безопасно работает с пустыми и неопределенными значениями
 * @return В зависимости от типа `price`:
 * * `undefined` или `null` - возвращает [заглушку]{@link PRICE_PLACEHOLDER}.
 * * `string` - конвертирует через [parseInt()]{@link parseInt},
 * если результат конвертации `NaN` - возвращает [заглушку]{@link PRICE_PLACEHOLDER},
 * иначе форматированную строку.
 * * `number` - возвращает форматированную строку.
 */
export function formatPriceShortBy(price: number | string | null | undefined, onlyNumbers = false) {
  const _price = typeof price !== 'number' ? safeConvertToPriceNumber(price) : price

  if (_price === undefined || _price === null) return PRICE_PLACEHOLDER

  let shortPrice = _price
  const digits = _price.toString().length

  if (digits > 6) {
    shortPrice = _price / 1000000
  }

  return onlyNumbers ? `${shortPrice}` : `от ${shortPrice} млн ₽`
}

/**
 * Форматирование `price` для вывода вида `5 000 000 ₽`
 * @param price - Описано в {@link formatPriceShortBy}
 * @return - Описано в {@link formatPriceShortBy}
 */
export function formatFullPrice(price: number | string | null | undefined) {
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
export function formatPriceForArea(price: number | string | null | undefined) {
  const fullPrice = formatFullPrice(price)
  return `${fullPrice} / м\u00B2`
}
