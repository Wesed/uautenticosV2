'use client'
import { ReactNode, createContext, useContext, useState } from 'react'

interface SizeContextType {
  selectedSize: number | null
  getSelectedSize: (size: number) => void
}

const SizeContext = createContext({} as SizeContextType)

export function SizeProvider({ children }: { children: ReactNode }) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null)

  function getSelectedSize(size: number) {
    setSelectedSize(size)
  }

  console.log(selectedSize)

  return (
    <SizeContext.Provider value={{ selectedSize, getSelectedSize }}>
      {children}
    </SizeContext.Provider>
  )
}

export const useSize = () => useContext(SizeContext)
