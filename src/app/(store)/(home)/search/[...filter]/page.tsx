import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { priceFormatter } from '@/utils/priceFormatter'
import { twMerge } from 'tailwind-merge'
import { ImageProd } from '../../components/image-prod'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

async function getProducts(filter: string) {
  const res = await api(`/search/${JSON.stringify(filter)}`, {
    cache: 'no-cache',
    // next: {
    //   revalidate: 60 * 60 * 24, // 24 hours
    // },
  })

  const products = await res.json()
  return products
}

export default async function FilterPage({
  params,
}: {
  params: { filter: string }
}) {
  const products = await getProducts(params.filter)

  return (
    <div className='grid grid-cols-products gap-10'>
      {products.length > 0 ? (
        products?.map((prod: Product) => (
          <Link
            key={prod.id}
            prefetch={false}
            href={`/products/${prod.slug}`}
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
        ))
      ) : (
        <div className='col-span-full flex flex-col items-center justify-center gap-3 text-xl text-gray-100'>
          <p> Ops, não temos produtos com esses filtros.</p>
          <Link
            href='/'
            className='font-bold transition-colors duration-300 hover:text-green500'
          >
            Voltar ao início
          </Link>
        </div>
      )}
    </div>
  )
}
