interface Image {
  url: string
}

export interface ImageProps {
  srcProp: Image[]
}

export interface Product {
  id: string
  name: string
  price: number
  images: Image[]
  sizes: string[]
  slug: string
}
