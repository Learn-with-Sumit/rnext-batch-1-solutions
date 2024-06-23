import { Copyright, Footer, Header, Navbar } from '@/components'
import ScrollProgress from '@/components/common/ScrollProgress'
import ScrollToTop from '@/components/common/ScrollToTop'
import { Toaster } from '@/components/ui/toaster'
import CartProvider from '@/providers/CartProvider'
import ThemeProvider from '@/providers/ThemeProvider'
import ToastProvider from '@/providers/ToastProvider'
import WishlistProvider from '@/providers/WishlistProvider'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { releaseProductsFromCartAndRestoreStock } from '../actions/cart.actions'
import './globals.css'

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
  params: { lang },
}: Readonly<{
  children: React.ReactNode
  params: ILang
}>) {
  // when user visits, this function will manage the stock expiry for not paid users, the expiry is set to 15 minutes from when user adds something to the cart, this process is also automated using cron.org that hits the route handler every 15 minutes.

  await releaseProductsFromCartAndRestoreStock()

  return (
    // suppress hydration warning needed to be used for next theme flashing problem, the flashing can still happen in dev mode by the way, u might see internal server error in the console but it's nothing to worry about
    <main className={`${poppins.className}`} suppressHydrationWarning>
      <ThemeProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <Header lang={lang} />
              <Navbar lang={lang} />
              {children}
              <Footer lang={lang} />
              <Copyright lang={lang} />
            </WishlistProvider>
          </CartProvider>
          <Toaster />
        </ToastProvider>
        <ScrollProgress />
        <ScrollToTop />
      </ThemeProvider>
    </main>
  )
}
