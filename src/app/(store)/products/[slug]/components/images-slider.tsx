'use client'
import 'swiper/css'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { ImageProps } from '@/data/types/product'
import Image from 'next/image'

export function ImageSlider({ srcProp }: ImageProps) {
  return (
    <div className=''>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination]}
        className=''
      >
        {srcProp.map((img) => (
          <SwiperSlide key={img.url} className=''>
            <Image
              src={img.url}
              alt=''
              width={800}
              height={800}
              className='mx-auto h-[350px] w-full rounded-lg object-cover'
              quality={100}
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
