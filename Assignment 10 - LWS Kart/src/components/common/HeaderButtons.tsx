'use client'
import { useCartContext } from '@/hooks/context-hooks/useCartContext'
import { useWishlistContext } from '@/hooks/context-hooks/useWishlistContext'
import useUseEffectMadness from '@/hooks/product-hooks/useUseEffectMadness'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa'
import { Avatar } from '../ui/avatar'
import ThemeSwitcher from '../ui/slider-toggle'

const HeaderButtons = ({
  wishlists,
  cartItems,
  headerButtonTexts,
  user,
}: IHeaderButtons) => {
  const { userWishlist } = useWishlistContext()
  const { userCart } = useCartContext()
  const { lang } = useParams()
  const isLoggedIn = user?._id

  const { wishlist, cart, account } = headerButtonTexts

  // lets keep the effects in one place, this will load the user cart and wishlist initially as a local state
  useUseEffectMadness(wishlists, cartItems)

  return (
    <div className='flex items-center space-x-4 dark:*:text-white'>
      <ThemeSwitcher />
      <Link
        href={
          !isLoggedIn ? `/${lang}/login?redirected_by=wishlist` : '/wishlist'
        }
        className='text-center text-gray-700 hover:text-primary relative flex items-center gap-2 hover:drop-shadow-lg hover:text-purple-600 hover:-translate-y-0.5 transition-all duration-300'
      >
        <FaHeart />
        <div className='text-xs leading-3 hover:underline underline-offset-4'>
          {wishlist}
        </div>
        {userWishlist.loading ? (
          <div className='absolute -right-3 -top-3 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white bg-red-500 text-xs'>
            <Loader2 className='animate-spin' />
          </div>
        ) : (
          <div className='absolute -right-3 -top-3 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white bg-red-500 text-xs'>
            {userWishlist?.data?.length}
          </div>
        )}
      </Link>
      <Link
        href={
          !isLoggedIn ? `/${lang}/login?redirected_by=checkout` : '/checkout'
        }
        className='text-center text-gray-700 hover:text-primary  relative gap-2 flex items-center justify-center hover:drop-shadow-lg hover:text-cyan-600 hover:-translate-y-0.5 transition-all duration-300'
      >
        <FaShoppingCart />
        <div className='text-xs leading-3  hover:underline underline-offset-4'>
          {cart}
        </div>
        {userCart.loading ? (
          <div className='absolute -right-3 -top-3 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white bg-red-500 text-xs'>
            <Loader2 className='animate-spin' />
          </div>
        ) : (
          <div className='absolute -right-3 -top-3 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white bg-red-500 text-xs'>
            {userCart?.data?.length}
          </div>
        )}
      </Link>
      <Link
        href={!isLoggedIn ? `/${lang}/login?redirected_by=account` : '/account'}
        className='text-center text-gray-700 hover:text-primary relative gap-2 flex items-center justify-center hover:drop-shadow-lg hover:text-blue-600 hover:-translate-y-0.5 transition-all duration-300'
      >
        {user?.image ? (
          <Avatar>
            <Image
              width={100}
              height={100}
              src={user?.image}
              alt='profile-image'
            />
          </Avatar>
        ) : (
          <FaUser />
        )}
        <div className='text-xs leading-3 hover:underline underline-offset-4 hover:drop-shadow-lg hover:-translate-y-0.5 transition-all duration-300'>
          {user?._id ? user?.name : account}
        </div>
      </Link>
    </div>
  )
}
export default HeaderButtons
