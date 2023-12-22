import { Header } from '@/components/header'
import '../../globals.css'
import { CartProvider } from '@/contexts/cart-context'
import { SidebarFilter } from './components/sidebar-filter/sidebar-container'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <div className='md:grid md:grid-cols-sidebarFilter md:items-start md:gap-10'>
        <SidebarFilter />
        {children}
      </div>
    </CartProvider>
  )
}
