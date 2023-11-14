interface Image {
  url: string
}

export interface Product {
  id: string
  name: string
  price: number
  images: string[]
  sizes: string[]
  slug: string
}