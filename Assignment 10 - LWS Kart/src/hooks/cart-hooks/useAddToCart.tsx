import ActionOfToast from '@/components/ui/toast-action'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCartContext } from '../context-hooks/useCartContext'
import useQuantity from '../product-hooks/useQuantity'

const addToCart = async (userId: string, product: IProduct) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`,
      {
        userId,
        product,
      }
    )
    return response.data
  } catch (error) {
    throw error
  }
}

const useAddToCart = (product?: IProduct) => {
  const { toast } = useToast()
  const router = useRouter()
  const { userCart, setUserCart } = useCartContext()
  const { setQuantity } = useQuantity(product?._id as string)
  const productInCart = userCart.data.some(
    (cartItem) => cartItem._id === product?._id
  )

  const productInOfflineCart = userCart.offlineCart.some(
    (cartItem) => cartItem._id === product?._id
  )

  let toastId

  const handleAddToCart = async (
    userId: string,
    product: IProductWithQuantity
  ) => {
    setQuantity(1)
    if (!userId) {
      // case when user is not logged in
      if (productInOfflineCart) {
        // clone the cart
        const clonedOfflineCart = [...userCart.offlineCart]
        // find if it exists already
        const existingProductIndex = clonedOfflineCart.findIndex(
          (cartProduct: IProductWithQuantity) => {
            return cartProduct._id.toString() === product._id.toString()
          }
        )
        // if exists, update the quantity
        if (existingProductIndex !== -1) {
          clonedOfflineCart[existingProductIndex].quantity += product.quantity
        }

        setUserCart({
          ...userCart,
          data: [],
          offlineCart: clonedOfflineCart,
        })
      } else {
        setUserCart({
          ...userCart,
          data: [],
          offlineCart: [...userCart.offlineCart, product],
        })
      }

      router.push('/login')
    } else {
      setUserCart({ ...userCart, loading: true })
      try {
        const data = await addToCart(userId, product)

        // product can go out of stock when user tries to add to cart so, show error if that occurs
        if (data?.status === 'no_stock') {
          toast({
            description: `${product.product_name} is out of stock`,
            variant: 'destructive',
          })
        } else {
          // quantity decrease
          if (product.quantity < 0) {
            toast({
              description: `${product.product_name} quantity decreased`,
              action: (
                <ActionOfToast
                  link='/checkout'
                  alt='Go cart'
                  text='Go to Checkout'
                />
              ),
            })
          }
          // quantity increase
          else if (productInCart) {
            toast({
              description: `${product.product_name} quantity increased`,
              action: (
                <ActionOfToast
                  link='/checkout'
                  alt='Go cart'
                  text='Go to Checkout'
                />
              ),
            })
            // newly added to cart
          } else {
            toast({
              description: `${product.product_name} added to cart`,
              action: (
                <ActionOfToast
                  link='/checkout'
                  alt='Go cart'
                  text='Go to Checkout'
                />
              ),
            })
          }
        }

        // Update cart state with new data
        setUserCart({ ...userCart, data: data.cart, loading: false })
        // the requirement says after clicking add to cart, take them to cart page, I think that is not a good UX, because every time a user clicks on add to cart, they wouldn't like to go to the cart page
        // so yeah, not using the router.push('/checkout')
      } catch (error) {
        // Handle error
        console.error('Error adding to cart:', error)
        toast({
          description: 'Failed to add item to cart. Please try again later.',
          variant: 'destructive',
        })
        setUserCart({ ...userCart, loading: false, error: true })
      }
    }
  }

  return { handleAddToCart, userCart, toastId }
}

export default useAddToCart
