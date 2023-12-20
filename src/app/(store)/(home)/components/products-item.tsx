'use client'

import { priceFormatter } from '@/utils/priceFormatter'
import { ShoppingBag } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { ImageProd } from './image-prod'
import { Product } from '@/data/types/product'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ProductItemProps {
  i: number
  prod: Product
}

export function ProductItem({ i, prod }: ProductItemProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ delay: i / 15 }}
      className=''
    >
      <Link
        href={`/products/${prod.slug}`}
        prefetch={false}
        className={twMerge(
          'h-[250px]',
          'group relative flex items-center justify-center',
          'cursor-pointer overflow-hidden rounded-lg bg-background ',
        )}
      >
        <ImageProd srcProp={prod.images} />
        <footer
          className={twMerge(
            'flex items-center justify-between',
            'absolute bottom-1 left-1 right-1 translate-y-[105%]',
            'rounded-md bg-black/60 p-3 opacity-0',
            'transition-all duration-200 ease-in-out',
            'opacity-100 group-hover:translate-y-0',
          )}
        >
          <div className='flex flex-col gap-1'>
            <strong className='text-sm'>{prod.name}</strong>
            <span className=' font-bold text-green300'>
              {priceFormatter(prod.price)}
            </span>
          </div>
          <div
            className={twMerge(
              'rounded-md transition-colors',
              'bg-gray800 p-2 text-white',
              'hover:bg-gray100 hover:text-gray800',
            )}
          >
            <ShoppingBag className='h-5 w-5' />
          </div>
        </footer>
      </Link>
    </motion.div>
  )
}
