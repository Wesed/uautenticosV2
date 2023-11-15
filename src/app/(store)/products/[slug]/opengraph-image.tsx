import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { ImageResponse } from 'next/og'
import colors from 'tailwindcss/colors'

export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product> {
  const res = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })
  const { product } = await res.json()
  return product
}

export default async function OGImage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: '100%',
          height: '100%',
          display: 'flex',
          objectFit: 'cover',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src={product.images[0].url} alt='' style={{ width: '100%' }} />
      </div>
    ),
    {
      ...size,
    },
  )
}
