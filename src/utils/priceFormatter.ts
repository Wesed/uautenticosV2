export function priceFormatter(price: number, divide?: boolean) {
  if (divide) {
    price = (price * 1.1) / 3
  }
  const priceFormatted = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  return priceFormatted
}
