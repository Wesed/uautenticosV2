import { ProductsDocument } from "@/graphql/generated/graphql"
import { client, ssrCache } from '@/lib/urql'

export default async function Home() {
  // const { data } = await client.query(ProductsDocument, {}).toPromise()
  return <p> oie </p>
}
