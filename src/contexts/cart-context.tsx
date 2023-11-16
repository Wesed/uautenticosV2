'use client'
import { ReactNode, createContext, useContext, useState } from 'react'

interface CartItem {
  productId: string
  name: string
  price: number
  size: number
  imageUrl: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: CartItem) => void
  removeToCart: (id: string, size: number) => void
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(product: CartItem) {
    setCartItems((state) => {
      // verify if product exists in cart
      const productInCart = state.some(
        (item) =>
          item.productId === product.productId && item.size === product.size,
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

  function removeToCart(id: string, size: number) {
    const updatedProductsAfterRemove = cartItems.filter((item) => {
      return item.productId !== id || item.size !== size
    })
    setCartItems(updatedProductsAfterRemove)
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart, removeToCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
