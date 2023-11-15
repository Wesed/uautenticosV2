'use client'
import { ReactNode, createContext, useContext, useState } from 'react'

interface CartItem {
  productId: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: CartItem) => void
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(product: CartItem) {
    setCartItems((state) => {
      // verify if product exists in cart
      const productInCart = state.some(
        (item) => item.productId === product.productId,
      )

      if (productInCart) {
        return state.map((item) => {
          if (item.productId === product.productId) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      } else {
        return [...state, { ...product }]
      }
    })
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
