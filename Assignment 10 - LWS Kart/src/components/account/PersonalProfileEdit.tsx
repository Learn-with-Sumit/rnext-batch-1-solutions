import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import usePersonalProfileEdit from '@/hooks/profile-hooks/usePersonalProfileEdit'
import { UploadDropzone } from '@/utils/uploadthing'
import { Loader2 } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import ProfilePasswordTab from './ProfilePasswordTab'

export function PersonalProfileEdit({
  user,
  setIsEditing,
  dictionary,
}: SessionWith_Id & { setIsEditing: Dispatch<SetStateAction<boolean>> } & {
  dictionary: IAccountPageDict['accountPage']
}) {
  // hook
  const {
    tab,
    setTab,
    isAccountTypeFacebookOrGoogle,
    handleSubmit,
    onSubmit,
    form,
    setImageUploaded,
    setValue,
    imageUploaded,
    loading,
    valuesChanged,
    errors,
  } = usePersonalProfileEdit({ user, setIsEditing })

  // dictionary
  const {
    name,
    email,
    phone,
    upload_text,
    upload_text_2,
    old_pass,
    new_pass,
    change_pass,
    submit,
  } = dictionary

  return (
    <ProfilePasswordTab
      dictionary={dictionary as IAccountPageDict['accountPage']}
      tab={tab}
      setTab={setTab}
      isAccountTypeFacebookOrGoogle={isAccountTypeFacebookOrGoogle}
      personalProfileForm={
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{name}</FormLabel>
                  <FormControl>
                    <Input placeholder={name} {...field} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            {!isAccountTypeFacebookOrGoogle && (
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{email}</FormLabel>
                    <FormControl>
                      <Input placeholder={email} {...field} type='email' />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{phone}</FormLabel>
                  <FormControl>
                    <Input placeholder={phone} {...field} type='number' />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            {!isAccountTypeFacebookOrGoogle && (
              <FormField
                control={form.control}
                name='image'
                render={() => (
                  <FormItem>
                    <UploadDropzone
                      endpoint='imageUploader'
                      onClientUploadComplete={(res) => {
                        setImageUploaded(true)
                        setValue('image', res[0].url)
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`)
                      }}
                    />
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
            )}

            {!imageUploaded && !isAccountTypeFacebookOrGoogle ? (
              <p className='text-orange-600 w-72 text-xs italic'>
                {upload_text}
              </p>
            ) : (
              !isAccountTypeFacebookOrGoogle && (
                <p className='text-green-500 w-72 text-xs italic'>
                  {upload_text_2}
                </p>
              )
            )}

            <Button disabled={loading || !valuesChanged} type='submit'>
              {loading ? (
                <Loader2 className='animate-spin text-center' />
              ) : (
                submit
              )}
            </Button>
            {errors?.root?.updateError?.type === 'updateError' ? (
              <p className='text-red-500 italic text-md text-center mt-2'>
                {errors?.root?.updateError?.message}
              </p>
            ) : null}
          </form>
        </Form>
      }
      passwordForm={
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='oldPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{old_pass}</FormLabel>
                  <FormControl>
                    <Input placeholder={old_pass} {...field} type='password' />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{new_pass}</FormLabel>
                  <FormControl>
                    <Input placeholder={new_pass} {...field} type='password' />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <Button disabled={loading || !valuesChanged} type='submit'>
              {loading ? (
                <Loader2 className='animate-spin text-center' />
              ) : (
                change_pass
              )}
            </Button>
            {errors?.root?.updateError?.type === 'updateError' ? (
              <p className='text-red-500 italic text-md text-center mt-2'>
                {errors?.root?.updateError?.message}
              </p>
            ) : null}
          </form>
        </Form>
      }
    />
  )
}
