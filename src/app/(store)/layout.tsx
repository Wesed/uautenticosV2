import { Header } from '@/components/header'
import '../globals.css'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='mx-auto grid min-h-screen w-full max-w-widthProject grid-rows-app gap-10 p-10'>
      <Header />
      {children}
    </div>
  )
}
