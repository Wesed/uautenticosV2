'use client'

import { ImageProps } from '@/data/types/product'
import Image from 'next/image'
import { useState } from 'react'

export function ImageProd({ srcProp }: ImageProps) {
  const [src, setSrc] = useState(srcProp[0])

  return (
    <Image
      src={src.toString()}
      alt=''
      width={520}
      height={480}
      className='object-cover'
      quality={100}
      priority
      onMouseOver={() => {
        srcProp.length > 1 && setSrc(srcProp[1])
      }}
      onMouseOut={() => {
        setSrc(srcProp[0])
      }}
    />
  )
}
