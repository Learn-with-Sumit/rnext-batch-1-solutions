import Navbar from '@/components/Home/Navbar.jsx'
import AuthProvider from '@/provider/AuthProvider.jsx'
import FavoriteProvider from '@/provider/FavoriteProvider.jsx'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <AuthProvider>
          <FavoriteProvider>
            <Navbar />
            {children}
          </FavoriteProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
