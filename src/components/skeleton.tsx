import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div 
      className={twMerge('bg-gray100/80 animate-pulse rounded-md', className)} 
      {...props} 
    />
  )
}