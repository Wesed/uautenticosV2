export function priceFormatter(price: number) {
  const priceFormatted = `R$ ${price.toFixed(2)}`
  return priceFormatted
}