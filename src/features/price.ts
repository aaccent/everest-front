export function formatPrice(price: number) {
  let shortPrice
  const digits = price.toString().length

  if (digits > 6) {
    shortPrice = price / 1000000
  }
  return `от ${shortPrice} млн ₽`
}