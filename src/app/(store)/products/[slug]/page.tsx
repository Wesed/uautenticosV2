import { priceFormatter } from '@/utils/priceFormatter'
import 'react-medium-image-zoom/dist/styles.css'
import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { Images } from './components/images'
import { Sizes } from './components/sizes'
import { Metadata } from 'next'
import { AddToCartButton } from './components/add-to-cart-button'
import { SizeProvider } from '@/contexts/size-context'

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

// Memoizacao | a chamada fetch acontece 1x nas duas chamadas
export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.slug)

  return {
    title: product.name,
  }
}

export default async function ProductPage({ params }: ProductProps) {
  const { id, images, name, price } = await getProduct(params.slug)

  const imageUrl = images[0].url

  return (
    <main className='mx-auto mb-10 flex max-w-widthProject grid-cols-product flex-col items-stretch gap-16 px-5 xl:grid'>
      <Images srcProp={images} />

      <div className='flex flex-col items-start justify-start'>
        <h2 className='whitespace-nowrap text-3xl font-bold leading-tight'>
          {name}
        </h2>
        {/* <p className='mt-2 text-lg text-gray400'>description</p> */}

        <div className='my-8 flex flex-col items-start gap-4 text-sm text-gray400'>
          <div className='flex items-center gap-3'>
            <span className='rounded-full bg-gray100 px-5 py-2.5 text-base font-semibold text-black'>
              {priceFormatter(price)}
            </span>
            <p>No PIX ou dinheiro</p>
          </div>
          <p>
            Ou no cartão em até 3x de{'  '}
            <span className='font-bold text-gray100'>
              {priceFormatter(price, true)}
            </span>
          </p>
        </div>

        <SizeProvider>
          <Sizes />
          <AddToCartButton product={{ id, imageUrl, name, price }} />
        </SizeProvider>
      </div>
    </main>
  )
}
