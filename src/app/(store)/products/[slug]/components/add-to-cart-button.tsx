'use client'

import { useCart } from '@/contexts/cart-context'
import { useSize } from '@/contexts/size-context'

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    imageUrl: string
  }
}
export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const { selectedSize } = useSize()

  function handleAddProductToCart() {
    if (selectedSize) {
      const { id, name, price, imageUrl } = product
      const prod = {
        productId: id,
        name,
        price,
        size: selectedSize,
        imageUrl,
        quantity: 1,
      }
      addToCart(prod)
    }
  }

  return (
    <button
      type='button'
      disabled={!selectedSize}
      onClick={handleAddProductToCart}
      className='mt-8 w-full rounded-lg bg-gray100 py-5 text-lg font-semibold text-black  transition-colors enabled:hover:bg-gray400 disabled:cursor-not-allowed disabled:opacity-60'
    >
      Adicionar ao carrinho
    </button>
  )
}
