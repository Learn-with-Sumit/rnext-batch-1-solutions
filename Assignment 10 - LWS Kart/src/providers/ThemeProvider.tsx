'use client'
import { LC_THEME_KEY } from '@/utils/constants'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { ReactNode, useState } from 'react'

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  let localStorageTheme =
    JSON.parse(localStorage.getItem(LC_THEME_KEY) as string) ?? false

  const [isDark, setIsDark] = useState(localStorageTheme)
  return (
    <NextThemeProvider attribute='class' defaultTheme='system'>
      {children}
    </NextThemeProvider>
  )
}
export default ThemeProvider
