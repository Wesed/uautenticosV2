import { ShoppingBag } from 'lucide-react'
export function Sidebar() {
  return (
    <div className='relative flex'>
      <ShoppingBag className='hover:text-gray100 h-8 w-8 cursor-pointer text-white ' />
      <span className='bg-green500 absolute -right-2 -top-1 h-5 w-5 rounded-full text-center text-sm font-bold'>
        0
      </span>
    </div>
  )
}
