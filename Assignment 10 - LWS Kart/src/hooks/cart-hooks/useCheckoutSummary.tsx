import { removeProductFromCart } from '@/app/actions/cart.actions'
import { createOrder } from '@/app/actions/order.actions'
import ActionOfToast from '@/components/ui/toast-action'
import { useToast } from '@/components/ui/use-toast'
import { CheckoutContext } from '@/context'
import { checkoutFormSchema } from '@/providers/CheckoutProvider'
import { useContext, useState } from 'react'
import { toast as toastifyToast } from 'react-toastify'
import { z } from 'zod'
import { useCartContext } from '../context-hooks/useCartContext'

const useCheckoutSummary = (userId: string) => {
  const {
    form: {
      register,
      handleSubmit,
      setError,
      clearErrors,
      formState: { errors },
    },
  } = useContext(CheckoutContext)
  const {
    userCart: { data, loading },
  } = useCartContext()

  const { toast } = useToast()

  const [ordering, setOrdering] = useState(false)
  const [showOrderDetails, setShowOrderDetails] = useState({
    orderDetails: {
      orders: [] as IProductWithQuantity[],
      user: {} as z.infer<typeof checkoutFormSchema>,
    },
    status: false,
  })

  // money 🤑 calculations
  const subtotal = Number(
    data.reduce((acc, curr) => acc + curr.quantity * curr.price, 0).toFixed(2)
  )
  const vat = (subtotal * (5 / 100)).toFixed(2) // lets add a 5% vat, shall we
  const total = (subtotal + parseFloat(vat) + (subtotal < 200 ? 5 : 0)).toFixed(
    2
  )

  // place order function
  const onSubmit = async (values: z.infer<typeof checkoutFormSchema>) => {
    const { agreement } = values
    // agreement cannot be false or else, setting an error
    if (!agreement) {
      setError('root.agreement', {
        type: 'notAvailable',
        message: 'You must accept the terms and conditions',
      })
      return
    } else {
      try {
        // loading true
        setOrdering(true)
        // create the order
        await createOrder(userId, values, data, Number(total))
        // clear cart but don't restock the products
        const cartItemRemovalPromises = data.map(async (product) => {
          removeProductFromCart(userId, product._id, false)
        })
        await Promise.all(cartItemRemovalPromises)
        setOrdering(false)

        // show modal of order details
        setShowOrderDetails({
          orderDetails: { orders: data, user: values },
          status: true,
        })
        toast({
          description: 'Order is placed',
          variant: 'default',
          duration: 3000,
          action: (
            <ActionOfToast
              link='/account'
              alt='Go account'
              text='Go to My Orders'
            />
          ),
        })
      } catch (error) {
        toastifyToast.error('Something went wrong', { autoClose: 1000 })
      }
    }
  }

  return {
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
  }
}
export default useCheckoutSummary
