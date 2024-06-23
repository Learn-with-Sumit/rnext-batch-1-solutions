import { Checkbox } from '@/components/ui/checkbox'

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
import useBillingForm from '@/hooks/profile-hooks/useBillingForm'
import { Loader2 } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export function BillingForm({
  user,
  setIsEditing,
  dictionary,
}: SessionWith_Id & { setIsEditing: Dispatch<SetStateAction<boolean>> } & {
  dictionary: IAccountPageDict['accountPage']
}) {
  const {
    address: address_locale,
    post_code,
    phone,
    same_as_shipping,
    submit,
  } = dictionary

  const { form, onSubmit, errors, handleCheckbox, loading } = useBillingForm({
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
              <FormMessage className='text-xs'>
                {errors?.postCode?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{address_locale}</FormLabel>
              <FormControl>
                <Input placeholder={address_locale} {...field} />
              </FormControl>
              <FormMessage className='text-xs'>
                {errors?.address?.message}
              </FormMessage>
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
              <FormMessage className='text-xs'>
                {errors?.phoneNumber?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <div className='flex items-center space-x-2'>
          <Checkbox
            onCheckedChange={(checked: boolean) => handleCheckbox(checked)}
            id='same-as-shipping'
          />
          <label
            htmlFor='same-as-shipping'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {same_as_shipping}
          </label>
        </div>
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
