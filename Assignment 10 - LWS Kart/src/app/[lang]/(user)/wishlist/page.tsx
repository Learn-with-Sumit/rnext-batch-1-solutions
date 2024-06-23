import { Wishlist, WishlistWrapper } from '@/components'
import ReactQueryProvider from '@/providers/QueryProvider'
import redirectIfNotLoggedIn from '@/utils/redirectIfNotLoggedIn'
import revokeAdminIsUsersPages from '@/utils/revokeAdminIsUsersPages'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wishlist',
  description: 'LWS Kart Wishlist',
}

const WishlistPage = async () => {
  await revokeAdminIsUsersPages()
  const userId = await redirectIfNotLoggedIn()
  return (
    <WishlistWrapper>
      <ReactQueryProvider>
        <Wishlist userId={userId} />
      </ReactQueryProvider>
    </WishlistWrapper>
  )
}
export default WishlistPage
