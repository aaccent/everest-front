const PRICE_PLACEHOLDER = 'нет цены'

/**
 * Форматирование `price` для вывода вида `от 5.5 млн ₽`
 * @param price Любой примитивный тип.
 * Переданный тип преобразуется в нужный для работы функции.
 * Безопасно работает с пустыми и неопределенными значениями
 * @return В зависимости от типа `price`:
 * * `undefined` или `null` - возвращает [заглушку]{@link PRICE_PLACEHOLDER}.
 * * `string` - конвертирует через [parseInt()]{@link parseInt},
 * если результат конвертации `NaN` - возвращает [заглушку]{@link PRICE_PLACEHOLDER},
 * иначе форматированную строку.
 * * `number` - возвращает форматированную строку.
 */
export function formatPriceShortBy(price: number | string | null | undefined) {
  if (!price) return PRICE_PLACEHOLDER

  const _price = typeof price === 'string' ? parseInt(price) : price
  if (Number.isNaN(_price)) return PRICE_PLACEHOLDER

  let shortPrice = _price
  const digits = _price.toString().length

  if (digits > 6) {
    shortPrice = _price / 1000000
  }

  return `от ${shortPrice} млн ₽`
}

/**
 * Форматирование `price` для вывода вида `5 000 000 ₽`
 */
export function formatFullPrice() {}
