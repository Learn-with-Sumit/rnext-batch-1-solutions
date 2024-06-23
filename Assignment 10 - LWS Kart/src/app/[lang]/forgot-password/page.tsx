import { ForgotPasswordForm } from '../../../components/auth/ForgotPasswordForm'
import { getDictionary } from '../dictionaries'

const ForgotPassword = async ({
  params: { lang },
}: {
  params: { lang: ILang['lang'] }
}) => {
  const dictionary = await getDictionary(lang)
  return (
    <main className='flex justify-center items-center min-h-[70vh]'>
      <ForgotPasswordForm dictionary={dictionary} />
    </main>
  )
}
export default ForgotPassword
