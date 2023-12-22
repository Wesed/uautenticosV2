import { Header } from '@/components/header'
import { CartProvider } from '@/contexts/cart-context'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <div className='min-h-screen w-full xl:mx-auto xl:grid xl:max-w-widthProject xl:grid-rows-app xl:gap-20 xl:p-10'>
        <Header />
        {children}
      </div>
    </CartProvider>
  )
}
