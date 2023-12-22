// import Link from 'next/link'
import { CartContainer } from './CartContainer'
import { Logo } from './logo'
import { SearchBar } from './searchBar'
import { Suspense } from 'react'

export function Header() {
  return (
    <div className='mb-10 grid grid-cols-3 items-center justify-between gap-5 px-5'>
      <Logo />
      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>
      <CartContainer />
    </div>
  )
}
