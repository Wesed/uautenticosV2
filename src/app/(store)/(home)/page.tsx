import { fetchGraphQuery } from "@/utils/graphql-query"
import { priceFormatter } from "@/utils/priceFormatter"
import { ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { twMerge } from 'tailwind-merge'


interface ProductProps {
  id: string
  name: string
  imageUrl: string
  price: number
  slug: string
}

interface ProductsProps {
  product: ProductProps[]
}

const getProducts = async () => {
  const query = `
  query Products {
    products {
      id
      slug
      name
      size
      price
      images {
        url
      }
    }
  }
  `

  const data = await fetchGraphQuery(query)

  const products = data.products.map((product: ProductProps) => {
    return {
      id: product.id,
      name: product.name,
      // @ts-ignore
      imageUrl: product.images[0].url,
      price: product.price,
      slug: product.slug,
    }
  })

  return products as ProductProps[]
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="grid min-h-[356px] max-w-widthProject grid-cols-products gap-10">
    {products?.map((prod) => (
      <Link
        key={prod.id}
        href={`/product/${prod.slug}`}
        prefetch={false}
        className={twMerge(
          'group relative flex items-center justify-center',
          'cursor-pointer overflow-hidden rounded-lg bg-background',
        )}
      >
        <Image
          src={prod.imageUrl}
          alt=""
          width={520}
          height={480}
          className="object-cover"
          quality={100}
          priority
        />
        <footer
          className={twMerge(
            'flex items-center justify-between',
            'absolute bottom-1 left-1 right-1 translate-y-[105%]',
            'rounded-md bg-black/60 p-3 opacity-0',
            'transition-all duration-200 ease-in-out',
            'opacity-100 group-hover:translate-y-0',
          )}
        >
          <div className="flex flex-col gap-1">
            <strong className="text-sm">{prod.name}</strong>
            <span className=" font-bold text-green300">
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
    ))}
  </div>
  )
}
