'use client'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import { twMerge } from 'tailwind-merge'

interface ImageArrayProps {
  images: string[]
}

export function Images({ images }: ImageArrayProps) {
  return (
    <div
      className={twMerge(
        'grid grid-cols-2 gap-2',
        `${images.length === 1 && 'flex justify-center'}`,
      )}
    >
      {images.map((img, i) => (
        <div
          key={i}
          className={twMerge(
            'h-[350px] w-[350px]',
            'items-center justify-center p-1',
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
              className='max-h-[350px] object-cover'
              quality={100}
              priority
            />
          </Zoom>
        </div>
      ))}
    </div>
  )
}
