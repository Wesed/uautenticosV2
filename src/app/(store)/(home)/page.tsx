import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { ProductItem } from './components/products-item'

async function getProducts(): Promise<Product[]> {
  const res = await api('/products', {
    cache: 'no-store',
    // next: {
    //   revalidate: 60 * 60 * 24, // 24 hours
    // },
  })
  const products = await res.json()
  return products
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className='grid grid-cols-productsMobile justify-between gap-y-5 px-3 md:gap-10 xl:grid-cols-products'>
      {products?.map((prod, i) => <ProductItem key={i} i={i} prod={prod} />)}
    </div>
  )
}
