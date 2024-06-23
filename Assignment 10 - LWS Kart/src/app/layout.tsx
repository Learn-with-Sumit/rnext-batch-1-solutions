import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './[lang]/globals.css'
import { releaseProductsFromCartAndRestoreStock } from './actions/cart.actions'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'LWS Kart',
  description: 'E-commerce Application of Learn with Sumit',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
