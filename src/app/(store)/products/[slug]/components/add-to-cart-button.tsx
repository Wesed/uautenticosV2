'use client'

import { useCart } from '@/contexts/cart-context'

interface AddToCartButtonProps {
  product: {
    id: string
    imageUrl: string
    name: string
    price: number
  }
}
export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  function handleAddProductToCart() {
    const { id, name, price, imageUrl } = product
    const prod = {
      productId: id,
      name,
      price,
      imageUrl,
      quantity: 1,
    }
    addToCart(prod)
  }

  return (
    <button
      type='button'
      onClick={handleAddProductToCart}
      className='mt-8 w-full rounded-lg bg-gray100 py-5 text-lg  font-semibold text-black transition-colors hover:bg-gray400'
    >
      Adicionar ao carrinho
    </button>
  )
}
