'use client'

import { Search } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export function SearchBar() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = searchParams.get('q')

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.query

    if (!query) {
      return null
    }

    router.push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className='relative col-span-full row-start-2 w-full md:col-auto md:col-start-2 md:row-start-1'
    >
      <input
        name='query'
        defaultValue={query ?? ''}
        type='text'
        className='w-full rounded-full bg-gray800 p-3 pl-12 pr-20 outline-0 placeholder:text-gray-400'
        placeholder='Pesquisar por...'
      />
      <button
        type='submit'
        className='absolute left-4 top-[13px] h-5 w-5 text-gray-600'
      >
        <Search className='h-full w-full' />
      </button>
    </form>
  )
}
