import logo from '@/assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { CartContainer } from './CartContainer'
import { SearchBar } from './searchBar'
import { Suspense } from 'react'

export function Header() {
  return (
    <div className='flex items-center gap-10'>
      <Link href='/' className=''>
        <Image src={logo} alt='' priority className='brightness-80 filter' />
      </Link>
      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>
      <CartContainer />
    </div>
  )
}
