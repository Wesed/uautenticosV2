import { Header } from '@/components/header'
import '../globals.css'
import { CartProvider } from '@/contexts/cart-context'
import { SidebarFilter } from './(home)/components/sidebar-filter/sidebar-container'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <div className='mx-auto grid min-h-screen w-full max-w-widthProject grid-rows-app gap-20 p-10'>
        <Header />
        {children}
      </div>
    </CartProvider>
  )
}
