export function formatPrice(price: number | null | undefined) {
  if (!price) return 'нет цены'
  let shortPrice = price
  const digits = price.toString().length

  if (digits > 6) {
    shortPrice = price / 1000000
  }
  return `от ${shortPrice} млн ₽`
}
