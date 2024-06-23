'use client'

import useStickyHeader from '@/hooks/misc-hooks/useStickyHeader'
import { ReactNode } from 'react'

const HeaderContainer = ({ children }: { children: ReactNode }) => {
  const stickyHeader = useStickyHeader()
  return (
    <header
      className={`py-4 w-full shadow-sm z-[9999] dark:bg-black dark:*:text-white ${
        stickyHeader ? 'fixed animate-fadeUp' : 'relative'
      } bg-white`}
    >
      {children}
    </header>
  )
}
export default HeaderContainer
