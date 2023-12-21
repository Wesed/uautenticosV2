import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { priceFormatter } from '@/utils/priceFormatter'
import { twMerge } from 'tailwind-merge'
import { ImageProd } from '../components/image-prod'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { redirect } from 'next/navigation'
import { ProductItem } from '../components/products-item'

interface SearchProps {
  searchParams: {
    q?: string | undefined
    size?: number | undefined
    gender?: string | undefined
    colors?: string | undefined
    price?: number | undefined
    brand?: string | undefined
  }
}

async function searchProducts(params: string): Promise<Product[]> {
  const res = await api(`/search?${params}`, {
    cache: 'no-cache',
    // next: {
    //   revalidate: 60 * 60 * 24, // 24 hours
    // },
  })
  const products = await res.json()
  return products
}

export default async function SearchPage({ searchParams }: SearchProps) {
  const params = new URLSearchParams(searchParams as string).toString()
  const { q: query } = searchParams
  const products = await searchProducts(params)

  // se acessar a pagina sem busca, retorna ao inicio

  return (
    <div className='flex h-full flex-col gap-5'>
      <span>
        Resultados para: <span className='font-bold'>{query}</span>
      </span>
      <div className='grid h-full grid-cols-products gap-10'>
        {products.length > 0 ? (
          products?.map((prod, i) => <ProductItem key={i} i={i} prod={prod} />)
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
