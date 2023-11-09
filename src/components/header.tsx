import logo from '@/assets/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Sidebar } from './Sidebar'

export function Header() {
  return (
    <div className='flex items-center justify-between'>
      <Link href='/' className=''>
        <Image src={logo} alt='' priority className='brightness-80 filter' />
      </Link>
      <Sidebar />
    </div>
  )
}
