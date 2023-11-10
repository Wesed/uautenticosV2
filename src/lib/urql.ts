import { ssrExchange, createClient, cacheExchange, fetchExchange } from 'urql'

// verifica se a requisicao é back ou frontend. Back nao tem window
const isServerSide = typeof window === 'undefined'
const ssrCache = ssrExchange({ isClient: !isServerSide })

const client = createClient({
  url: process.env.NEXT_PUBLIC_HYGRAPH_API as string,
  exchanges: [cacheExchange, ssrCache, fetchExchange],
})

export { client, ssrCache }