'use client'

import { twMerge } from 'tailwind-merge'
import { ShoppingBag, X } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { useCart } from '@/contexts/cart-context'
import { ProductContainer } from './product-container'
import Link from 'next/link'
import { priceFormatter } from '@/utils/priceFormatter'
import { AnimatePresence, motion } from 'framer-motion'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export function CartContainer() {
  const { items } = useCart()
  const [open, setOpen] = useState(false)
  const [getTotalCartValue, setTotalCartValue] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [parent] = useAutoAnimate()

  // close cart container
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        !target.closest('[data-target=".sidebar"]')
      ) {
        setOpen(false)
      }
    }

    // fica ouvindo os eventos em document
    document.addEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    let sum = 0
    items.forEach((item) => {
      sum += item.price * item.quantity
    })
    setTotalCartValue(sum)
  }, [items])

  return (
    <div ref={containerRef} className='ml-auto'>
      <button
        onClick={() => {
          setOpen(!open)
        }}
        className='relative flex bg-transparent'
      >
        <ShoppingBag className='h-8 w-8 cursor-pointer text-white hover:text-gray100' />
        <span className='absolute -right-2 -top-1 h-5 w-5 rounded-full bg-green500 text-center text-sm font-bold text-gray100'>
          {items?.length}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: open ? 1 : 0 }}
            exit={{ scale: 0 }}
            className={twMerge(
              'fixed right-0 top-0 z-10 flex-col justify-center',
              'min-h-screen w-[480px]',
              'rounded-md bg-gray800 px-12 shadow-3xl',
              `${open ? 'flex' : 'hidden'}`,
            )}
          >
            <button
              onClick={() => {
                setOpen(!open)
              }}
              className='absolute right-6 top-6 text-gray400 transition-colors hover:text-green500'
            >
              <X className='h-6 w-6' />
            </button>

            {items?.length > 0 ? (
              <>
                <h2 className='mb-8 mt-[72px] text-xl font-bold text-gray100'>
                  Sacola de compras
                </h2>

                <div ref={parent} className='flex flex-col gap-6'>
                  {items.map((prod) => (
                    <ProductContainer
                      key={prod.productId}
                      id={prod.productId}
                      image={prod.imageUrl}
                      description={prod.name}
                      size={prod.size}
                      price={prod.price}
                      quantity={prod.quantity}
                    />
                  ))}
                </div>

                <div className='mt-8 flex flex-col gap-2'>
                  Possui cupom de desconto?
                  <input
                    type='text'
                    className={twMerge(
                      'w-full rounded-md',
                      'bg-gray900 p-2',
                      'border-0 outline-none',
                    )}
                  />
                </div>

                <footer className='mb-12 mt-auto flex w-full flex-col gap-2'>
                  <div className='flex justify-between'>
                    <span className='text-gray100'>Quantidade</span>
                    <span className=''>{items.length} itens</span>
                  </div>

                  <div className='flex justify-between'>
                    <span className='text-lg font-bold'>Valor total</span>
                    <span className='text-2xl font-bold'>
                      {priceFormatter(getTotalCartValue)}
                    </span>
                  </div>

                  <button
                    // onClick={handleBuyProduct}
                    // disabled={isCreatingCheckout}
                    className={twMerge(
                      'mt-5 cursor-pointer rounded-lg p-5',
                      'font-bold uppercase text-white',
                      'transition-colors',
                      'bg-green500 enabled:hover:bg-green300',
                      'disabled:cursor-not-allowed disabled:opacity-70',
                    )}
                  >
                    Finalizar Pedido
                  </button>
                </footer>
              </>
            ) : (
              <div className='flex flex-col gap-4 self-center text-gray300'>
                O seu carrinho está vazio!
                <span className=''>
                  <Link
                    href='/'
                    className='font-bold transition-colors hover:text-white'
                    onClick={() => {
                      setOpen(false)
                    }}
                  >
                    Clique aqui
                  </Link>{' '}
                  para comprar!
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
