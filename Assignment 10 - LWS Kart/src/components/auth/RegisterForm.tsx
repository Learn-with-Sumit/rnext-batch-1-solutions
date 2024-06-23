'use client'

import { Form } from '@/components/ui/form'
import useRegister from '@/hooks/auth-hooks/useRegister'
import { RegisterPageTranslations } from '@/utils/constants'
import getFocusedFieldIcons from '@/utils/getFocusedFieldIcons'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import FormRow from './FormRow'

const RegisterForm = () => {
  const {
    form,
    handleSubmit,
    onSubmit,
    focusedField,
    isPasswordMatching,
    errors,
    setFocusedField,
    isSubmitting,
    passwordFromInput,
  } = useRegister()

  const { lang } = useParams()
  const isLocaleBengali = lang === 'bn'
  const t = isLocaleBengali
    ? RegisterPageTranslations.bn
    : RegisterPageTranslations.en

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex justify-center h-4'
        >
          {getFocusedFieldIcons(focusedField)}
        </motion.div>
        <div className='space-y-2'>
          <FormRow
            focusedField={focusedField}
            form={form}
            label={t.fullNameLabel}
            placeholder={t.fullNamePlaceholder}
            name='fullName'
            setFocusedField={setFocusedField}
          />
          <FormRow
            form={form}
            label={t.emailLabel}
            name='email'
            placeholder={t.emailPlaceholder}
            setFocusedField={setFocusedField}
          />
          <FormRow
            form={form}
            label={t.passwordLabel}
            name='password'
            placeholder={t.passwordPlaceholder}
            setFocusedField={setFocusedField}
          />
          <FormRow
            form={form}
            label={t.confirmPasswordLabel}
            name='confirmedPassword'
            placeholder={t.confirmPasswordPlaceholder}
            setFocusedField={setFocusedField}
          />
          {/* show status of password matching */}
          {passwordFromInput.length > 0 && isPasswordMatching ? (
            <p className='text-green-500 italic text-xs'>{t.passwordMatch}</p>
          ) : (
            passwordFromInput.length > 0 && (
              <p className='text-red-500 italic text-xs'>
                {t.passwordMismatch}
              </p>
            )
          )}
          {errors?.root?.userExistsError?.type === 'custom' ? (
            <p className='text-red-500 italic text-md'>{t.userExistsError}</p>
          ) : null}
          <FormRow
            form={form}
            name='agreement'
            setFocusedField={setFocusedField}
          />
        </div>
        <motion.button
          disabled={isSubmitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          type='submit'
          className='block w-full py-2 text-center text-black hover:bg-slate-200 bg-primary border border-primary rounded hover:text-primary transition uppercase font-roboto font-medium mt-4'
        >
          {isSubmitting ? (
            <div className='flex gap-2 justify-center items-center'>
              <p>{t.registering}</p>
              <Loader2 className='animate-spin' />
            </div>
          ) : (
            <p className='dark:text-white'>{t.register}</p>
          )}
        </motion.button>
      </form>
    </Form>
  )
}
export default RegisterForm
