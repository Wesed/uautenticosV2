'use client'

import { useCart } from '@/contexts/cart-context'
import { ShoppingBag } from 'lucide-react'

export function CartWidget() {
  const { items } = useCart()
  return (
    <div className='relative flex'>
      <ShoppingBag className='h-8 w-8 cursor-pointer text-white hover:text-gray100' />
      <span className='absolute -right-2 -top-1 h-5 w-5 rounded-full bg-green500 text-center text-sm font-bold'>
        {items.length}
      </span>
    </div>
  )
}
