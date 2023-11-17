'use client'

import { useSize } from '@/contexts/size-context'
import { twMerge } from 'tailwind-merge'

export function Sizes() {
  const { getSelectedSize } = useSize()
  const sizes = [34, 35, 36, 37, 38, 39, 40, 41, 42, 43]

  return (
    <div className='flex flex-wrap gap-3 text-gray300'>
      {sizes.map((size) => (
        <label key={size}>
          <input
            type='radio'
            name='size'
            value={size}
            className='peer hidden'
            onChange={() => {
              getSelectedSize(size)
            }}
          />
          <div
            className={twMerge(
              'cursor-pointer rounded-lg px-5 py-3 font-semibold',
              'hover:transition-all',
              'bg-gray800 hover:bg-gray800/60 hover:text-gray100',
              'peer-checked:bg-gray100 peer-checked:text-black',
            )}
          >
            {size}
          </div>
        </label>
      ))}
    </div>
  )
}
