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
    >
      <Link
        href={`/products/${prod.slug}`}
        prefetch={false}
        className={twMerge(
          'h-[350px] md:h-[250px]',
          'group relative flex justify-center md:items-center',
          'cursor-pointer overflow-hidden rounded-lg',
        )}
      >
        <ImageProd srcProp={prod.images} />
        <footer
          className={twMerge(
            'flex items-center justify-between',
            'absolute -left-2 bottom-8 md:bottom-1 md:left-1 md:right-1 xl:translate-y-[105%]',
            'rounded-md p-3 md:bg-black/60',
            'transition-all duration-200 ease-in-out',
            'group-hover:translate-y-0',
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
              'hidden rounded-md transition-colors md:flex',
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
