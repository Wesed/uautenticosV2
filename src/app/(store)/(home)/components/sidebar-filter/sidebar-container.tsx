'use client'

import * as Accordion from '@radix-ui/react-accordion'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Slider from '@radix-ui/react-slider'

import { SidebarItem } from './sidebar-item'
import { twMerge } from 'tailwind-merge'
import { Check, Search, X } from 'lucide-react'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface FilterProps {
  size: number | null
  gender: string[] | null
  color: string | null
  priceRange: number[]
  brand: string[] | null
  isEmpty: boolean
}

export function SidebarFilter() {
  const router = useRouter()

  const [filter, setFilter] = useState<FilterProps>({
    size: null,
    gender: null,
    color: null,
    priceRange: [40],
    brand: null,
    isEmpty: true,
  })

  const sizes = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43]

  const colors = [
    {
      name: 'Amarelo',
      color: 'bg-yellow-500',
    },
    {
      name: 'Nude',
      color: 'bg-rose-300',
    },
    {
      name: 'Azul',
      color: 'bg-blue-500',
    },
    {
      name: 'Branco',
      color: 'bg-white',
    },
    {
      name: 'Preto',
      color: 'bg-black',
    },
    {
      name: 'Rosa',
      color: 'bg-pink-300',
    },
    {
      name: 'Rainbow',
      color: 'bg-rainbow',
    },
  ]

  const genders = [
    {
      name: 'Feminino',
      id: 'f',
    },
    {
      name: 'Masculino',
      id: 'm',
    },
    {
      name: 'Unissex',
      id: 'u',
    },
  ]

  const brands = [
    {
      name: 'Nike',
      id: 'nike',
    },
    {
      name: 'Puma',
      id: 'puma',
    },
    {
      name: 'Prada',
      id: 'prada',
    },
    {
      name: 'Gucci',
      id: 'gucci',
    },
    {
      name: 'Mizuno',
      id: 'mizuno',
    },
    {
      name: 'adidas',
      id: 'adidas',
    },
    {
      name: 'New Balance',
      id: 'newBalance',
    },
    {
      name: 'Olympikus',
      id: 'olympikus',
    },
  ]

  useEffect(() => {
    function generateFilterString() {
      let filterString = ''

      if (filter.size) {
        filterString += `/size/${filter.size}`
      }

      if (filter.gender) {
        filterString += `/gender/${filter.gender}`
      }

      if (filter.color) {
        filterString += `/color/${filter.color.toLowerCase()}`
      }

      if (filter.priceRange.every((value) => value > 40)) {
        console.log(filter.priceRange)
        filterString += `/price/${filter.priceRange}`
      }

      if (filter.brand) {
        filterString += `/brand/${filter.brand}`
      }

      router.push(`/search${filterString}`)
    }

    if (!filter.isEmpty) {
      generateFilterString()
    }
  }, [filter, router])

  function updateFilters(
    filterType: string,
    filterValue?: [string, boolean | 'indeterminate'] | string | number,
  ) {
    switch (filterType) {
      case 'size':
        setFilter((state) => ({
          ...state,
          size: Number(filterValue),
        }))
        break

      case 'gender':
        if (Array.isArray(filterValue)) {
          const genderKey = filterValue[0].toLocaleLowerCase()
          const genderValue = !!(filterValue[1] === true)
          let newGender: string[] = filter.gender ?? []

          if (genderValue) {
            newGender.push(genderKey)
          } else {
            newGender = newGender.filter((item) => item !== genderKey)
          }

          setFilter((state) => ({
            ...state,
            gender: newGender,
          }))
        }
        break

      case 'color':
        setFilter((state) => ({
          ...state,
          color: String(filterValue),
        }))
        break

      case 'price':
        setFilter((state) => ({
          ...state,
          priceRange: [Number(filterValue)],
        }))
        break

      case 'brand':
        if (Array.isArray(filterValue)) {
          const brandKey = filterValue[0].toLocaleLowerCase()
          const brandValue = !!(filterValue[1] === true)
          let newBrand: string[] = filter.brand ?? []

          if (brandValue) {
            newBrand.push(brandKey)
          } else {
            newBrand = newBrand.filter((item) => item !== brandKey)
          }

          setFilter((state) => ({
            ...state,
            brand: newBrand,
          }))
        }
        break
    }

    if (filterType === 'clearFilter') {
      setFilter((state) => ({
        ...state,
        size: null,
        gender: null,
        color: null,
        priceRange: [40],
        brand: null,
        isEmpty: true,
      }))
      router.push('/')
    } else {
      setFilter((state) => ({
        ...state,
        isEmpty: false,
      }))
    }
  }

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
    <div className='flex flex-col gap-5'>
      <form onSubmit={handleSearch} className='relative'>
        <Search className='absolute right-2 top-2 h-5 w-5 text-gray-400' />
        <input
          name='query'
          type='text'
          className='w-full rounded-md bg-gray800 p-2 pl-3 pr-8 outline-0 placeholder:text-gray400'
          placeholder='Pesquisar por...'
        />
      </form>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <span className='px-1 text-gray300'>Filtrar por</span>
          <button
            onClick={() => {
              updateFilters('clearFilter')
            }}
            className='flex items-center text-sm text-gray-400 transition-colors duration-300 hover:text-gray-100'
          >
            <X className='h-4 w-4' />
            Limpar filtros
          </button>
        </div>
        <Accordion.Root
          type='single'
          collapsible
          className='flex flex-col gap-3'
        >
          <SidebarItem filter='Tamanho' value='size'>
            <div className='flex flex-wrap gap-2 text-gray300'>
              {sizes.map((size) => (
                <label key={size}>
                  <input
                    type='radio'
                    name='size'
                    value={size}
                    className='peer hidden'
                    onChange={(e) => {
                      updateFilters('size', Number(e.target.value))
                    }}
                  />
                  <div
                    className={twMerge(
                      'cursor-pointer rounded-lg px-5 py-1 font-semibold',
                      'hover:transition-all',
                      'border border-gray400/20',
                      'hover:border-gray400 hover:text-gray100',
                      'peer-checked:bg-gray100 peer-checked:text-black',
                    )}
                  >
                    {size}
                  </div>
                </label>
              ))}
            </div>
          </SidebarItem>

          <SidebarItem filter='Gênero' value='gender'>
            <div className='flex flex-col  gap-2'>
              {genders.map((gender) => (
                <div key={gender.id} className='flex items-center gap-2'>
                  <Checkbox.Root
                    id={gender.id}
                    className='flex h-4 w-4 items-center justify-center rounded-sm bg-gray400 shadow-sm shadow-black data-[state=checked]:bg-gray100'
                    onCheckedChange={(check) =>
                      updateFilters('gender', [gender.name, check])
                    }
                  >
                    <Checkbox.Indicator>
                      <Check className='h-3 w-3 text-gray800' />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label
                    htmlFor={gender.id}
                    className='cursor-pointer hover:text-gray100'
                  >
                    {gender.name}
                  </label>
                </div>
              ))}
            </div>
          </SidebarItem>

          <SidebarItem filter='Cores' value='colors'>
            <div className='flex flex-wrap gap-y-1'>
              {colors.map((color) => (
                <label
                  key={color.name}
                  className='flex w-16 cursor-pointer flex-col items-center justify-center gap-1 hover:scale-110'
                >
                  <input
                    type='radio'
                    name='size'
                    value={color.name}
                    className='peer hidden'
                    onChange={(e) => {
                      updateFilters('color', String(e.target.value))
                    }}
                  />
                  <span className={`${color.color} h-5 w-5 rounded-full`} />
                  <span className='text-sm'>{color.name}</span>
                </label>
              ))}
            </div>
          </SidebarItem>

          <SidebarItem filter='Faixa de preço' value='price'>
            <Slider.Root
              className='w-50 relative flex h-5 select-none items-center'
              defaultValue={[40]}
              value={filter.priceRange}
              min={40}
              max={200}
              step={10}
              onValueChange={(value) => {
                updateFilters('price', Number(value[0]))
              }}
            >
              <Slider.Track className='relative h-1 flex-grow rounded-full bg-gray900'>
                <Slider.Range className='absolute h-full rounded-full bg-white' />
              </Slider.Track>
              <Slider.Thumb
                className='block h-5 w-5 cursor-pointer rounded-full bg-white shadow-md hover:bg-gray900 focus:outline-none focus:ring-2 focus:ring-gray900'
                aria-label='price'
              />
            </Slider.Root>
            <div className='mt-2 flex justify-between text-sm'>
              <span className=''>À partir de R$ {filter.priceRange}</span>
            </div>
          </SidebarItem>

          <SidebarItem filter='Marca' value='brand'>
            <div className='grid grid-cols-2 gap-2'>
              {brands.map((brand) => (
                <div key={brand.id} className='flex items-center gap-2'>
                  <Checkbox.Root
                    id={brand.id}
                    className='flex h-4 w-4 items-center justify-center rounded-sm bg-gray400 shadow-sm shadow-black data-[state=checked]:bg-gray100'
                    onCheckedChange={(check) =>
                      updateFilters('brand', [brand.name, check])
                    }
                  >
                    <Checkbox.Indicator>
                      <Check className='h-3 w-3 text-gray800' />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label
                    htmlFor={brand.id}
                    className='cursor-pointer hover:text-gray100'
                  >
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </SidebarItem>
        </Accordion.Root>
      </div>
    </div>
  )
}
