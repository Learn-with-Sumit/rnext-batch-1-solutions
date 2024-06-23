'use client'

import useCheckoutSummary from '@/hooks/cart-hooks/useCheckoutSummary'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { MdDiscount } from 'react-icons/md'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'
import OrderDetailsDialog from './OrderDetailsDialog'
import TermsAndConditions from './T&C'

const CheckoutSummary = ({
  userId,
  dictionary,
}: {
  userId: string
  dictionary: ICheckoutPageDict
}) => {
  const { lang } = useParams()
  const isLocaleBengali = lang === 'bn'
  const {
    checkoutPage: {
      order_summary,
      subtotal_label,
      vat_label,
      shipping_label,
      free_shipping_message,
      free_label,
      standard_rate_message,
      total_label,
      agree_to_the,
      terms_conditions_label,
      place_order,
    },
  } = dictionary

  const {
    loading,
    data,
    subtotal,
    vat,
    total,
    register,
    clearErrors,
    errors,
    handleSubmit,
    onSubmit,
    ordering,
    setShowOrderDetails,
    showOrderDetails,
  } = useCheckoutSummary(userId)

  let content = null

  if (loading) {
    content = <Loader2 className='animate-spin text-xl min-h-48 m-auto' />
  }

  if (!loading && data.length === 0) {
    content = <EmptyCart dictionary={dictionary} />
  }

  if (!loading && data.length > 0) {
    content = (
      <div className='space-y-2 max-h-80 overflow-y-auto'>
        <AnimatePresence>
          {data.map((product: IProductWithQuantity) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <CartItem userId={userId} key={product._id} product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className='col-span-4 border border-gray-200 p-4 rounded'>
      <h4 className='text-lg mb-4 text-blue-500 font-medium uppercase'>
        {order_summary}
      </h4>
      {content}
      {loading ? (
        <Loader2 className='animate-spin text-xl min-h-48 m-auto' />
      ) : (
        data.length > 0 && (
          <>
            <div className='flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase'>
              <p>{subtotal_label}</p>
              <p className='text-teal-500'>${subtotal}</p>
            </div>
            <div className='flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase'>
              <p>{vat_label}</p>
              <p className='text-cyan-700'>${vat}</p>
            </div>
            <div className='flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase'>
              <p>{shipping_label}</p>
              <div className='flex gap-2 items-center'>
                {subtotal > 200 && (
                  <p className='italic text-xs capitalize flex gap-2 items-center'>
                    <MdDiscount className='text-teal-500' />
                    {free_shipping_message}
                  </p>
                )}
                <p className='text-blue-500'>
                  {subtotal > 200 ? free_label : standard_rate_message}
                </p>
              </div>
            </div>
            <div className='flex justify-between text-gray-800 font-medium py-3 uppercase'>
              <p className='font-semibold'>{total_label}</p>
              <p className='text-orange-500'>${total}</p>
            </div>
            <div className='flex flex-col items-center mb-4 mt-2'>
              <div className='flex gap-2 items-center'>
                <input
                  type='checkbox'
                  id='agreement'
                  {...register('agreement')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      clearErrors('root.agreement')
                    }
                  }}
                  className='text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3'
                />
                <label
                  htmlFor='agreement'
                  className='text-gray-600 ml-3 cursor-pointer text-sm'
                >
                  {agree_to_the}{' '}
                  <Dialog>
                    <DialogTrigger>
                      <p className='text-blue-500 italic'>
                        {terms_conditions_label}
                      </p>
                    </DialogTrigger>
                    <DialogContent className='w-fit'>
                      <DialogHeader>
                        <DialogTitle className='mb-4'>
                          LWSKart {terms_conditions_label}
                        </DialogTitle>
                      </DialogHeader>
                      <TermsAndConditions isLocaleBengali={isLocaleBengali} />
                    </DialogContent>
                  </Dialog>
                </label>
              </div>
              <p className='text-xs text-red-500 font-semibold'>
                {errors?.root?.agreement?.message}
              </p>
            </div>
            <Button
              onClick={handleSubmit(onSubmit)}
              variant={'secondary'}
              className='w-full py-3 px-4 flex items-center justify-center text-center text-slate-800 bg-primary border border-primary rounded-md hover:bg-blue-500 hover:text-white transition font-medium'
            >
              {ordering ? (
                <Loader2 className='animate-spin' />
              ) : (
                <p>{place_order}</p>
              )}
            </Button>
            <OrderDetailsDialog
              setShowOrderDetails={setShowOrderDetails}
              showOrderDetails={showOrderDetails}
              total={Number(total)}
            />
          </>
        )
      )}
    </div>
  )
}

export default CheckoutSummary
