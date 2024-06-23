import { NewPasswordForm } from '@/components/auth/NewPasswordForm'
import { getDictionary } from '../dictionaries'

const NewPasswordPage = async ({
  params: { lang },
}: {
  params: { lang: ILang['lang'] }
}) => {
  const dictionary = await getDictionary(lang)
  return (
    <main className='flex justify-center items-center min-h-[70vh]'>
      <NewPasswordForm dictionary={dictionary} />
    </main>
  )
}
export default NewPasswordPage
