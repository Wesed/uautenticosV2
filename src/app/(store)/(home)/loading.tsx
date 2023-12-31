import { Skeleton } from '@/components/skeleton'
import { twMerge } from 'tailwind-merge'

export default function HomeLoading() {
  return (
    <div className='grid grid-cols-productsMobile justify-between gap-y-5 xl:grid-cols-products xl:gap-10'>
      {[...Array(8)].map((_, i) => (
        <Skeleton
          key={i}
          className={twMerge(
            'h-[250px]',
            'group relative flex items-center justify-center',
            'cursor-pointer overflow-hidden rounded-lg bg-background',
          )}
        />
      ))}
    </div>
  )
}
