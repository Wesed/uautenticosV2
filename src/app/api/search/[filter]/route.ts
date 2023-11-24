import { Product } from '@/data/types/product'

interface filterProps {
  params: {
    size: string
    gender: string
    color: string
    price: number
    brand: string
  }
}

interface FilterProps {
  size?: number[]
  gender?: string[]
  color?: string
  price?: number
  brand?: string
}

type FilterTypes = {
  size: 'Int'
  gender: 'String'
  color: 'String'
  price: 'Int'
  brand: 'String'
  [key: string | number]: string
}

const conditions: { [key: string]: string } = {
  size: '_contains_some',
  gender: '_contains_some',
  color: '_contains',
  price: '_gte',
  brand: '_contains',
}

const isArray: { [key: string]: boolean } = {
  size: true,
  gender: true,
  color: false,
  price: false,
  brand: false,
}

const types: FilterTypes = {
  size: 'Int',
  gender: 'String',
  color: 'String',
  price: 'Int',
  brand: 'String',
}

export async function GET(_: Request, { params }) {
  const filter = JSON.parse(params.filter)

  const filterObj: FilterProps = {}

  const size: number[] = []
  const gender: string[] = []

  for (let i = 0; i < filter.length; i++) {
    switch (filter[i]) {
      case 'size':
        size.push(Number(filter[i + 1]))
        filterObj.size = size
        break
      case 'gender':
        gender.push(filter[i + 1])
        filterObj.gender = gender
        break
      case 'color':
        filterObj.color = filter[i + 1]
        break
      case 'price':
        filterObj.price = Number(filter[i + 1])
        break
      case 'brand':
        filterObj.brand = filter[i + 1]
        break
    }
  }

  const variablesQuery = Object.keys(filterObj)
    .map((key) => {
      const type = isArray[key] ? `[${types[key]}!]` : `${types[key]}!`
      return `$${key}: ${type}`
    })
    .join(',')

  const whereQuery = Object.keys(filterObj)
    .map((key) => {
      return `${key}${conditions[key]}: $${key}`
    })
    .join(',')

  const keys = Object.entries(filterObj).map(([key, value]) => key)

  const values = Object.entries(filterObj).map(([key, value]) => value)

  console.log('aq', values)

  const variables = keys.reduce((obj: Record<string, ''>, key, index) => {
    obj[key] = values[index]
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
  console.log(variables)
  console.log(query)

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

  console.log(data)

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
