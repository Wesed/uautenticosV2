import { z } from 'zod'
import type { NextRequest } from 'next/server'
import { FilterProps, Product } from '@/data/types/product'

const conditions: { [key: string]: string } = {
  size: '_contains_some',
  gender: '_contains_some',
  color: '_contains',
  price: '_gte',
  brand: '_in',
  q: '_search',
}

const isArray: { [key: string]: boolean } = {
  q: false,
  size: true,
  gender: true,
  color: false,
  price: false,
  brand: true,
}

type FilterTypes = {
  size: 'Int'
  gender: 'String'
  color: 'String'
  price: 'Float'
  brand: 'String'
  [key: string | number]: string
}

const types: FilterTypes = {
  q: 'String',
  size: 'Int',
  gender: 'String',
  color: 'String',
  price: 'Float',
  brand: 'String',
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const filterObj: FilterProps = {
    size: searchParams.has('size') ? [] : undefined,
    gender: searchParams.has('gender') ? [] : undefined,
    brand: searchParams.has('brand') ? [] : undefined,
  }

  for (const [key, value] of searchParams.entries()) {
    switch (key) {
      case 'q':
        filterObj.q = value
        break
      case 'size':
        filterObj.size?.push(Number(value))
        break
      case 'gender':
        filterObj.gender?.push(value)
        break
      case 'color':
        filterObj.color = value
        break
      case 'priceRange':
        filterObj.price = Number(value)
        break
      case 'brand':
        filterObj.brand?.push(value)
        break
    }
  }

  const keys = Object.entries(filterObj).map(([key, value]) => key)

  const values = Object.entries(filterObj).map(([key, value]) => value)

  const variablesQuery = Object.keys(filterObj)
    .filter((key) => filterObj[key as keyof FilterProps] !== undefined)
    .map((key) => {
      const type = isArray[key] ? `[${types[key]}!]` : `${types[key]}!`
      return `$${key}: ${type}`
    })
    .join(', ')

  const whereQuery = Object.keys(filterObj)
    .filter((key) => filterObj[key as keyof FilterProps] !== undefined)
    .map((key) => {
      if (key === 'q') {
        return `${conditions[key]}: $${key}`
      } else {
        return `${key}${conditions[key]}: $${key}`
      }
    })
    .join(', ')

  const variables = keys.reduce((obj: Record<string, string[]>, key, index) => {
    if (key === 'gender') {
      obj[key] = String(values[index]).split(',')
    } else {
      obj[key] = values[index]
    }

    return obj
  }, {})

  const query = `
    query Product(${variablesQuery}) {
      products (
          where: {${whereQuery}}
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

  const res = await fetch(process.env.NEXT_PUBLIC_HYGRAPH_API!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
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
