import { z } from 'zod'
import type { NextRequest } from 'next/server'
import { Product } from '@/data/types/product'

const query = `
query Products($q: String!) {
  products (
    where: {
      _search: $q
    }
  ) {
      id
      slug
      name
      price
      size
     images {
      url
     }
    }
  }
`

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const q = z.string().parse(searchParams.get('q'))

  const res = await fetch(process.env.NEXT_PUBLIC_HYGRAPH_API!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        q,
      },
    }),
  })

  const { data } = await res.json()

  if (!data) {
    return Response.json(
      { message: 'Nenhum produto disponível' },
      { status: 400 },
    )
  }

  const products = data.products.map((prod: Product) => {
    return {
      ...prod,
      images: prod.images.map((image) => image.url),
    }
  })
  return Response.json(products)
}
