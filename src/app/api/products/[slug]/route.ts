import { z } from 'zod'

const query = `
query Product($slug: String!) {
  product (
    where: {
      slug: $slug
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

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  const slug = z.string().parse(params.slug)

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
        slug,
      },
    }),
  })

  const { data } = await res.json()

  const { product } = data

  if (!data) {
    return Response.json({ message: 'Produto nao encontrado' }, { status: 400 })
  }

  return Response.json(data)
}
