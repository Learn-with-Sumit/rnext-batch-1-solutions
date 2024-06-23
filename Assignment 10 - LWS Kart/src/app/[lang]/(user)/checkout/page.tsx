import {
  Breadcrumb,
  CheckoutForm,
  CheckoutSummary,
  CheckoutWrapper,
} from '@/components'
import redirectIfNotLoggedIn from '@/utils/redirectIfNotLoggedIn'
import revokeAdminIsUsersPages from '@/utils/revokeAdminIsUsersPages'
import { Metadata } from 'next'
import { getDictionary } from '../../dictionaries'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'LWS Kart Checkout',
}

const CheckoutPage = async ({
  params: { lang },
}: {
  params: { lang: ILang['lang'] }
}) => {
  await revokeAdminIsUsersPages()
  const dictionary = await getDictionary(lang)
  const userId = await redirectIfNotLoggedIn()
  return (
    <>
      <Breadcrumb />
      <CheckoutWrapper>
        <CheckoutForm
          dictionary={dictionary as ICheckoutPageDict}
          userId={userId}
        />
        <CheckoutSummary
          dictionary={dictionary as ICheckoutPageDict}
          userId={userId}
        />
      </CheckoutWrapper>
    </>
  )
}
export default CheckoutPage
