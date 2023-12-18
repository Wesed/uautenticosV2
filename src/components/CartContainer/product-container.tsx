import { useCart } from '@/contexts/cart-context'
import { priceFormatter } from '@/utils/priceFormatter'
import Image from 'next/image'

export interface ProductContainerProps {
  id: string
  image: string
  description: string
  price: number
  size: number
  quantity: number
}

export function ProductContainer({
  id,
  image,
  description,
  price,
  size,
  quantity,
}: ProductContainerProps) {
  const { removeToCart } = useCart()

  const handleDeleteProduct = () => {
    removeToCart(id, size)
  }

  return (
    <div className='flex items-start gap-5'>
      <div className='rounded-lg bg-gradient'>
        <Image src={image} alt='' width={100} height={90} />
      </div>
      <div className='flex flex-col items-start gap-1'>
        <span className='text-lg text-gray300'>{description}</span>
        <span className=' text-sm text-gray400'>Tamanho: {size}</span>
        <span className=' text-sm text-gray400'>Quantidade: {quantity}</span>
        <strong className='mb-2 text-lg font-bold text-gray100'>
          {priceFormatter(price)}
        </strong>
        <button
          onClick={handleDeleteProduct}
          className='font-bold text-green500 transition-colors hover:text-green300'
          data-target='.sidebar'
        >
          Remover
        </button>
      </div>
    </div>
  )
}
