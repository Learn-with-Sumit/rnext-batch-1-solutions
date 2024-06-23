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
import useShippingForm from '@/hooks/profile-hooks/useShippingForm'
import { Loader2 } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export function ShippingForm({
  user,
  setIsEditing,
  dictionary,
}: SessionWith_Id & { setIsEditing: Dispatch<SetStateAction<boolean>> } & {
  dictionary: IAccountPageDict['accountPage']
}) {
  const { post_code, address, phone, submit } = dictionary

  const { form, onSubmit, loading, errors } = useShippingForm({
    user,
    setIsEditing,
    dictionary,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='postCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{post_code}</FormLabel>
              <FormControl>
                <Input placeholder={post_code} {...field} type='number' />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{address}</FormLabel>
              <FormControl>
                <Input placeholder={address} {...field} />
              </FormControl>
              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
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
        <Button disabled={loading} type='submit'>
          {loading ? <Loader2 className='animate-spin text-center' /> : submit}
        </Button>
        {errors?.root?.updateError?.type === 'updateError' ? (
          <p className='text-red-500 italic text-md text-center mt-2'>
            {errors?.root?.updateError?.message}
          </p>
        ) : null}
      </form>
    </Form>
  )
}
