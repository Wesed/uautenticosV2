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

export async function GET() {
  const res = await fetch(process.env.NEXT_PUBLIC_HYGRAPH_API!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  })

  const { data } = await res.json()

  return Response.json(data.products)
}
