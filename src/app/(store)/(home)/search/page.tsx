import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { priceFormatter } from '@/utils/priceFormatter'
import { twMerge } from 'tailwind-merge'
import { ImageProd } from '../components/image-prod'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { redirect } from 'next/navigation'

interface SearchProps {
  searchParams: {
    q: string
  }
}

async function searchProducts(query: string): Promise<Product[]> {
  const res = await api(`/search?q=${query}`, {
    next: {
      revalidate: 60 * 60 * 24, // 24 hours
    },
  })
  const products = await res.json()
  return products
}

export default async function SearchPage({ searchParams }: SearchProps) {
  const { q: query } = searchParams
  const products = await searchProducts(query)

  // se acessar a pagina sem busca, retorna ao inicio
  // if (!query) {
  //   redirect('/')
  // }

  return (
    <div className='flex h-full flex-col gap-5'>
      <span>
        Resultados para: <span className='font-bold'>{query}</span>
      </span>
      <div className='grid h-full grid-cols-products gap-10'>
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
          <div className='col-span-full flex flex-col items-center justify-center gap-3 text-xl text-gray-300'>
            <p> Ops, não temos produtos nessa busca.</p>
            <Link
              href='/'
              className='font-bold text-gray-100 transition-colors duration-300 hover:text-green500'
            >
              Voltar ao início
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
