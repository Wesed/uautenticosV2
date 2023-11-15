'use client'

import { useCart } from '@/contexts/cart-context'

interface AddToCartButtonProps {
  productId: string
}
export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  function handleAddProductToCart() {
    addToCart(productId)
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
