import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RegisterPageTranslations } from '@/utils/constants'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import TermsAndConditions from '../checkout/T&C'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog'

const FormRow = ({
  form,
  name,
  label,
  placeholder,
  setFocusedField,
  focusedField,
  dictionary,
}: IFormRowProp & ILoginLocale) => {
  const { lang } = useParams()
  const isLocaleBengali = lang === 'bn'
  const t = isLocaleBengali
    ? RegisterPageTranslations.bn
    : RegisterPageTranslations.en

  if (name === 'agreement' || name === 'remember') {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <div className='flex items-center dark:text-white'>
              <FormControl>
                <Input
                  onFocus={() => setFocusedField(name)}
                  type='checkbox'
                  id={name}
                  className='text-primary focus:ring-0 rounded-sm cursor-pointer size-4 mt-4'
                  {...field}
                />
              </FormControl>
              <div className='w-full mt-4'>
                {name === 'agreement' ? (
                  <label
                    htmlFor='agreement'
                    className='text-gray-600 ml-3 cursor-pointer flex gap-2 dark:text-white'
                  >
                    {t.termsAndConditions}
                    <Dialog>
                      <DialogTrigger>
                        <p className='text-blue-500 italic'>{t.toc}</p>
                      </DialogTrigger>
                      <DialogContent className='w-fit'>
                        <DialogHeader>Terms and Conditions</DialogHeader>
                        {/* lws terms and condiitons */}
                        <TermsAndConditions isLocaleBengali={isLocaleBengali} />
                      </DialogContent>
                    </Dialog>
                    <p className='text-blue-500 underline underline-offset-2'></p>
                  </label>
                ) : (
                  <div className='flex justify-between'>
                    <label
                      htmlFor='remember'
                      className='text-gray-600 ml-3 cursor-pointer dark:text-white'
                    >
                      {dictionary?.rememberMe}
                    </label>
                    <Link
                      href='/forgot-password'
                      className='text-blue-500 underline text-xs mt-1 underline-offset-4'
                    >
                      {dictionary?.forgotPassword}
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  } else
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-black dark:text-white'>
              {label}
            </FormLabel>
            <FormControl>
              <Input
                type={
                  // this check names for password types
                  ['password', 'confirmedPassword'].indexOf(name) >= 0
                    ? 'password'
                    : 'text'
                }
                autoFocus={
                  focusedField === 'fullName' || focusedField === 'email'
                }
                onFocus={() => setFocusedField(name)}
                className='block w-full border dark:text-white border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
                placeholder={placeholder}
                {...field}
                onBlur={() => setFocusedField('')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
}
export default FormRow
