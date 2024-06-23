import { Breadcrumb } from '@/components'
import AccountInfo from '@/components/account/AccountInfo'
import AccountWrapper from '@/components/account/AccountWrapper'
import MyOrders from '@/components/account/MyOrders'
import ReactQueryProvider from '@/providers/QueryProvider'
import redirectIfNotLoggedIn from '@/utils/redirectIfNotLoggedIn'
import revokeAdminIsUsersPages from '@/utils/revokeAdminIsUsersPages'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account',
  description: 'LWS Kart User Account',
}

const AccountPage = async ({
  params: { lang },
  searchParams,
}: {
  params: {
    lang: ILang['lang']
  }
  searchParams: {
    limit: number
    skip: number
  }
}) => {
  await revokeAdminIsUsersPages() // don't let admin enter this place
  await redirectIfNotLoggedIn()

  return (
    <>
      <Breadcrumb />
      <AccountWrapper>
        <ReactQueryProvider>
          <AccountInfo lang={lang} />
          <MyOrders searchParams={searchParams} lang={lang} />
        </ReactQueryProvider>
      </AccountWrapper>
    </>
  )
}
export default AccountPage
