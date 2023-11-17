'use client'

import * as Accordion from '@radix-ui/react-accordion'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Slider from '@radix-ui/react-slider'

import { SidebarItem } from './sidebar-item'
import { twMerge } from 'tailwind-merge'
import { Check, Search } from 'lucide-react'
import { useState } from 'react'

export function SidebarFilter() {
  const [priceRange, setPriceRange] = useState<number[]>([40])
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

  return (
    <div className='flex flex-col gap-5'>
      <div className='relative'>
        <Search className='text-gray-400 absolute right-2 top-2 h-5 w-5' />
        <input
          type='text'
          className='w-full rounded-md bg-gray800 p-2 pl-3 pr-8 outline-0 placeholder:text-gray400'
          placeholder='Pesquisar por...'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <span className='px-1 text-gray300'>Filtrar por</span>
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
            <div className='flex items-center gap-2'>
              <Checkbox.Root
                defaultChecked
                id='f'
                className='flex h-4 w-4 items-center justify-center rounded-sm bg-gray400 shadow-sm shadow-black data-[state=checked]:bg-gray100'
              >
                <Checkbox.Indicator>
                  <Check className='h-3 w-3 text-gray800' />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor='f' className='cursor-pointer hover:text-gray100'>
                Feminino
              </label>
            </div>

            <div className='flex items-center gap-2'>
              <Checkbox.Root
                id='m'
                className='flex h-4 w-4 items-center justify-center rounded-sm bg-gray400 shadow-sm shadow-black data-[state=checked]:bg-gray100'
              >
                <Checkbox.Indicator>
                  <Check className='h-3 w-3 text-gray800' />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor='m' className='cursor-pointer hover:text-gray100'>
                Masculino
              </label>
            </div>

            <div className='flex items-center gap-2'>
              <Checkbox.Root
                id='u'
                className='flex h-4 w-4 items-center justify-center rounded-sm bg-gray400 shadow-sm shadow-black data-[state=checked]:bg-gray100'
              >
                <Checkbox.Indicator>
                  <Check className='h-3 w-3 text-gray800' />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <label htmlFor='u' className='cursor-pointer hover:text-gray100'>
                Unissex
              </label>
            </div>
          </SidebarItem>

          <SidebarItem filter='Cores' value='colors'>
            <div className='flex flex-wrap gap-y-1'>
              {colors.map((color) => (
                <div
                  key={color.name}
                  className='flex w-16 cursor-pointer flex-col items-center justify-center gap-1 hover:scale-110'
                >
                  <span className={`${color.color} h-5 w-5 rounded-full`} />
                  <span className='text-sm'>{color.name}</span>
                </div>
              ))}
            </div>
          </SidebarItem>

          <SidebarItem filter='Faixa de preço' value='price'>
            <Slider.Root
              className='w-50 relative flex h-5 select-none items-center'
              defaultValue={[40]}
              value={priceRange}
              min={40}
              max={200}
              step={10}
              onValueChange={setPriceRange}
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
              <span className=''>À partir de R$ {priceRange}</span>
            </div>
          </SidebarItem>

          <SidebarItem filter='Marca' value='brand'>
            <div className='grid grid-cols-2 gap-2'>
              {brands.map((brand) => (
                <div key={brand.id} className='flex items-center gap-2'>
                  <Checkbox.Root
                    id={brand.id}
                    className='flex h-4 w-4 items-center justify-center rounded-sm bg-gray400 shadow-sm shadow-black data-[state=checked]:bg-gray100'
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
