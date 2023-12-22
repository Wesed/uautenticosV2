'use client'
import { ImageProps } from '@/data/types/product'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import { twMerge } from 'tailwind-merge'

export function Images({ srcProp }: ImageProps) {
  return (
    <div
      className={twMerge(
        'grid grid-cols-2 gap-2',
        `${srcProp.length === 1 && 'flex justify-center'}`,
      )}
    >
      {srcProp.map((img, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ delay: i / 15 }}
          className={twMerge(
            'h-[350px] w-[350px] overflow-hidden',
            'flex items-center justify-center',
            'bg-gray800',
            `${i % 2 === 0 ? 'rounded-l-lg' : 'rounded-r-lg'}`,
          )}
        >
          <Zoom>
            <Image
              src={img.url}
              alt=''
              width={800}
              height={800}
              className='h-[350px] w-[350px] object-cover'
              quality={100}
              priority
            />
          </Zoom>
        </motion.div>
      ))}
    </div>
  )
}
