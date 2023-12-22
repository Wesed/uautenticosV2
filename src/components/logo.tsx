'use client'
import logo from '@/assets/logo.svg'
import logoMobile from '@/assets/logo-mobile-branco.svg'
import Image from 'next/image'
import UseMedia from '@/hooks/useMedia'

export function Logo() {
  const isMobile = UseMedia('(max-width: 640px)')
  return (
    <a href='/' className=''>
      {isMobile ? (
        <Image
          src={logoMobile}
          alt=''
          width={80}
          height={80}
          priority
          className='brightness-80 fill-white filter'
        />
      ) : (
        <Image src={logo} alt='' priority className='brightness-80 filter' />
      )}
    </a>
  )
}
