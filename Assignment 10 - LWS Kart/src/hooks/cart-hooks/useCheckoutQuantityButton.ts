import useAddToCart from '@/hooks/cart-hooks/useAddToCart'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import useStock from '../product-hooks/useStock'

export const useCheckoutQuantityButton = ({
  product,
}: IUseQuantityButtonProps) => {
  const quantity: number = product?.quantity
  const [cartProduct, setCartProduct] = useState(product)
  const [emoji, setEmoji] = useState('')
  const [currentQuantity, setCurrentQuantity] = useState(0)
  const [emojiTimeout, setEmojiTimeout] = useState<NodeJS.Timeout | null>(null)
  const { handleAddToCart } = useAddToCart(product)
  const { data, isLoading, isError } = useStock(product)
  const queryClient = useQueryClient()

  const handleIncrease = () => {
    queryClient.invalidateQueries({ queryKey: ['stock', product._id] })
    setCartProduct(
      (prevProduct) =>
        ({
          ...prevProduct,
          quantity: prevProduct.quantity + 1,
        } as IProductWithQuantity)
    )
    setCurrentQuantity((prev) => prev + 1)

    setEmoji('😊')
    if (emojiTimeout) {
      clearTimeout(emojiTimeout)
    }
    setEmojiTimeout(
      setTimeout(() => {
        setEmoji('')
      }, 500)
    )
  }

  const handleDecrease = () => {
    queryClient.invalidateQueries({ queryKey: ['stock', product._id] })

    setCartProduct(
      (prevProduct) =>
        ({
          ...prevProduct,
          quantity: Math.max(prevProduct.quantity - 1, 1),
        } as IProductWithQuantity)
    )

    setCurrentQuantity((prev) => Math.max(0, prev - 1))
    setEmoji('😢')
    if (emojiTimeout) {
      clearTimeout(emojiTimeout)
    }
    setEmojiTimeout(
      setTimeout(() => {
        setEmoji('')
      }, 500)
    )
  }

  useEffect(() => {
    return () => {
      if (emojiTimeout) {
        clearTimeout(emojiTimeout)
      }
    }
  }, [emojiTimeout])

  return {
    cartProduct,
    currentQuantity,
    emoji,
    isLoading,
    stock: data?.data?.stock,
    handleIncrease,
    handleDecrease,
    handleAddToCart,
    originalQuantity: quantity,
    isError,
  }
}
