export function priceFormatter(price: number) {
  const priceFormatted = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  return priceFormatted
}