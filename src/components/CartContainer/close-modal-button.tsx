'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

export function CloseModalButton() {
  const [open, setOpen] = useState(false)

  return (
    <button
      onClick={() => {
        setOpen(!open)
      }}
      className='absolute right-6 top-6 text-gray400 transition-colors hover:text-green500'
    >
      <X className='h-6 w-6' />
    </button>
  )
}
