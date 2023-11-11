import { ProductsDocument } from "@/graphql/generated/graphql";
import { client } from "@/lib/urql";
import { buildSchema } from 'type-graphql'

export async function POST() {
  const response = await fetch('https://api-sa-east-1.hygraph.com/v2/clok4dptf4o7n01upadree4jz/master', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query Products {
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
      }`,
    })
  })
  const { data } = await response.json()
  console.log('aq', data)
  
  return Response.json(data)
}