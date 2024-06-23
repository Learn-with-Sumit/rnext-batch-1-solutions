import { getDictionary } from '@/app/[lang]/dictionaries'
import { auth } from '@/auth'
import BillingAddress from './BillingAddress'
import PersonalProfile from './PersonalProfile'
import ShippingAddress from './ShippingAddress'

const AccountInfo = async ({ lang }: { lang: ILang['lang'] }) => {
  const { accountPage } = await getDictionary(lang)

  const session = (await auth()) as SessionWith_Id

  return (
    <>
      <div className=' grid grid-cols-3 gap-4 mx-auto max-w-5xl *:animate-fadeUp'>
        <PersonalProfile dictionary={accountPage as any} user={session?.user} />
        <ShippingAddress dictionary={accountPage as any} user={session?.user} />
        <BillingAddress dictionary={accountPage as any} user={session?.user} />
      </div>
    </>
  )
}
export default AccountInfo
