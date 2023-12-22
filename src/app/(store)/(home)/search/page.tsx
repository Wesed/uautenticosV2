import { api } from '@/data/api'
import { FilterProps, Product } from '@/data/types/product'
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

const translations = {
  q: 'busca',
  size: 'tamanho(s)',
  gender: 'gênero',
  brand: 'marca',
  color: 'cor',
  priceRange: 'preço',
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
  const products = await searchProducts(params)

  const translateParams = Object.fromEntries(
    Object.entries(searchParams).map(([chave, valor]) => [
      translations[chave as keyof typeof translations] || chave,
      valor,
    ]),
  )

  return (
    <div className='flex h-full flex-col gap-5 px-3'>
      <div className='flex gap-2'>
        <span className='whitespace-nowrap'>Resultados para:</span>
        <div className='flex flex-wrap divide-x divide-white/20'>
          {Object.entries(translateParams).map(([field, value]) => (
            <span className='px-3' key={field}>
              {field === 'preço' ? (
                <>
                  {field} à partir de:
                  <span className='font-bold'>R$ {value}</span>
                </>
              ) : (
                <>
                  {field}: <span className='font-bold'>{value}</span>
                </>
              )}
            </span>
          ))}
        </div>
      </div>
      <div className='grid-cols-productsMobile grid gap-3 md:gap-10 xl:grid-cols-products'>
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
