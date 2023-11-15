import { Skeleton } from '@/components/skeleton'
import { twMerge } from 'tailwind-merge'

export default function HomeLoading() {
  return (
    <main className='mx-auto grid max-w-widthProject grid-cols-product items-stretch gap-16'>
      <div className='grid grid-cols-products gap-10'>
        {[...Array(4)].map((_, i) => (
          <Skeleton
            key={i}
            className={twMerge(
              'h-[350px] w-[350px]',
              'items-center justify-center p-1',
              'bg-gray800',
              `${i % 2 === 0 ? 'rounded-l-lg' : 'rounded-r-lg'}`,
            )}
          />
        ))}
      </div>
    </main>
  )
}
