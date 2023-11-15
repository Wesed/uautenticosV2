import { priceFormatter } from '@/utils/priceFormatter'
import { twMerge } from 'tailwind-merge'
import 'react-medium-image-zoom/dist/styles.css'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { Images } from './images'
import { Sizes } from './sizes'

interface ProductProps {
  params: {
    slug: string
  }
}

async function getProduct(slug: string): Promise<Product> {
  const res = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })
  const { product } = await res.json()
  return product
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProduct(params.slug)

  return (
    <main className='mx-auto grid max-w-widthProject grid-cols-product items-stretch gap-16'>
      <Images images={product.images} />

      <div className='flex flex-col items-start justify-start'>
        <h2 className='text-3xl font-bold leading-tight'>{product.name}</h2>
        <p className='mt-2 text-lg text-gray400'>product.description</p>

        <div className='mt-8 flex flex-col items-start gap-4 text-sm text-gray400'>
          <div className='flex items-center gap-3'>
            <span className='rounded-full bg-green500 px-5 py-2.5 text-base font-semibold text-gray100'>
              {priceFormatter(product.price)}
            </span>
            <p>No PIX ou dinheiro</p>
          </div>
          <p>
            Ou no cartão em até 3x de{'  '}
            <span className='font-bold text-green300'>
              {priceFormatter(product.price, true)}
            </span>
          </p>
        </div>

        <Sizes />

        <button
          type='button'
          // onClick={handleNewProduct}
          className='mt-8 w-full rounded-lg bg-green500 py-5 text-lg  font-semibold text-white transition-colors hover:bg-green300'
        >
          Adicionar ao carrinho
        </button>
      </div>
    </main>
  )
}
