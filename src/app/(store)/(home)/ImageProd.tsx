'use client'

import { ImageProps } from '@/data/types/product'
import Image from 'next/image'
import { useState } from 'react'

export function ImageProd({ srcProp }: ImageProps) {
  const [src, setSrc] = useState(srcProp[0].url)

  return (
    <Image
      src={src}
      alt=''
      width={520}
      height={480}
      className='object-cover'
      quality={100}
      priority
      onMouseOver={() => {
        srcProp.length > 1 && setSrc(srcProp[1].url)
      }}
      onMouseOut={() => {
        setSrc(srcProp[0].url)
      }}
    />
  )
}
