import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { ReactNode } from 'react'

interface SidebarItemProps {
  filter: string
  value: string
  children: ReactNode
}

export function SidebarItem({ filter, value, children }: SidebarItemProps) {
  return (
    <Accordion.Item
      value={value}
      className='rounded-lg bg-gray800 text-gray300 shadow-sm shadow-black'
    >
      <Accordion.Header className='group flex items-center p-3'>
        <Accordion.Trigger className='w-full p-1 text-left hover:text-gray100'>
          {filter}
        </Accordion.Trigger>
        <ChevronDown className='transition-transform group-data-[state=open]:rotate-180' />
      </Accordion.Header>
      <Accordion.Content className='p-3'>{children}</Accordion.Content>
    </Accordion.Item>
  )
}
