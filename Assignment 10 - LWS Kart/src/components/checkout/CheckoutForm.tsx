'use client'
import { CheckoutContext } from '@/context'
import useCheckoutSummary from '@/hooks/cart-hooks/useCheckoutSummary'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useContext } from 'react'
import { IoBagCheckOutline } from 'react-icons/io5'
import FormRow from './FormRow'

const CheckoutForm = ({
  userId,
  dictionary,
}: {
  userId: string
  dictionary: ICheckoutPageDict
}) => {
  const { form } = useContext(CheckoutContext) as any

  const {
    checkoutPage: {
      checkout,
      nothing_to_checkout,
      first_name,
      last_name,
      country_region,
      street_address,
      city,
      phone_number,
      email_address,
      card_number,
      cvv,
      email,
    },
  } = dictionary

  const { loading, data } = useCheckoutSummary(userId)

  return (
    <div className='col-span-8 border border-gray-200 p-4 rounded'>
      <h3 className='text-lg font-medium capitalize mb-4'>{checkout}</h3>
      {loading ? (
        <Loader2 className='animate-spin min-h-96 m-auto' />
      ) : !loading && data.length === 0 ? (
        <div className='min-h-96 flex flex-col items-center justify-center'>
          <motion.div
            animate={{
              y: [0, -10, 0],
              transition: { duration: 2, repeat: Infinity },
            }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <IoBagCheckOutline className='text-5xl' />
          </motion.div>
          <p>{nothing_to_checkout}</p>
        </div>
      ) : (
        <form autoComplete='off'>
          <AnimatePresence>
            {!loading && data.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className='space-y-4'
              >
                <div className='grid grid-cols-2 gap-4'>
                  <FormRow
                    form={form}
                    label={first_name}
                    name='firstName'
                    placeholder={first_name}
                  />
                  <FormRow
                    form={form}
                    label={last_name}
                    name='lastName'
                    placeholder={last_name}
                  />
                </div>
                <FormRow
                  form={form}
                  label={country_region}
                  name='region'
                  placeholder={country_region}
                />
                <FormRow
                  form={form}
                  label={street_address}
                  name='address'
                  placeholder={street_address}
                />
                <FormRow
                  form={form}
                  label={city}
                  name='city'
                  placeholder={city}
                />
                <FormRow
                  form={form}
                  label={phone_number}
                  name='phone'
                  placeholder={phone_number}
                />
                <FormRow
                  form={form}
                  label={email_address}
                  name='email'
                  placeholder={email}
                />
                <div className='flex items-center gap-2'>
                  <FormRow
                    form={form}
                    label={card_number}
                    name='payment'
                    placeholder={card_number}
                  />
                  <FormRow
                    form={form}
                    label={cvv}
                    name='cvv'
                    placeholder={cvv}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      )}
    </div>
  )
}

export default CheckoutForm
