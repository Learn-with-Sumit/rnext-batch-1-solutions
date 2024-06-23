import { reviewOrderedItem } from '@/app/actions/order.actions'
import useGetSingleProduct from '@/hooks/product-hooks/useGetSingleProduct'
import { ReviewProductTranslations } from '@/utils/constants'

import { useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

const useReviewProduct = ({ userId, productId }: IReviewProduct) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [hover, setHover] = useState(null)
  const { data: { reviews } = {}, isLoading } = useGetSingleProduct(productId)

  // get my reviews
  const myReview = (reviews as IReviews['reviews'])?.find(
    (review) => review?.productId === productId && review?.userId === userId
  )?.review!
  // get my ratings
  const myRating = (reviews as IReviews['reviews'])?.find(
    (review) => review?.productId === productId && review?.userId === userId
  )?.rating!
  // get my bad review
  const myBadReview = (reviews as IReviews['reviews'])?.find(
    (review) => review?.productId === productId && review?.userId === userId
  )?.badReasonReview!

  const [rating, setRating] = useState<number | null>()
  const [badReviewReason, setBadReviewReason] = useState('')
  const [review, setReview] = useState('')
  const router = useRouter()
  const queryClient = useQueryClient()
  const pathname = usePathname()

  const isLocaleBengali = pathname.includes('/bn')
  const t = isLocaleBengali
    ? ReviewProductTranslations.bn
    : ReviewProductTranslations.en

  // submit the review
  const handleSubmit = async () => {
    setIsSubmitting(true)
    if (rating && review) {
      const response = await reviewOrderedItem(
        userId,
        productId,
        rating as number,
        review,
        badReviewReason
      )
      // success message
      if (response?.status === 'success') {
        toast.success(t.ratedProduct(rating), { autoClose: 1500 })
        router.refresh()
      }
      // error message
      if (response?.status === 'error') {
        toast.error(t.errorSubmitting)
      }
      setIsOpen(false)
      setIsSubmitting(false)
      queryClient.invalidateQueries({
        queryKey: ['product', productId],
      })
    } else {
      toast.error(t.addRequiredInfo)
      setIsSubmitting(false)
    }
  }

  const handleOpenMyReview = () => {
    if (myReview && myRating) {
      setRating(myRating)
      setReview(myReview)
      setBadReviewReason(myBadReview)
    }
    setIsOpen(true)
  }

  return {
    isOpen,
    setIsOpen,
    isLoading,
    handleOpenMyReview,
    reviews,
    rating,
    setRating,
    hover,
    setHover,
    review,
    setReview,
    isSubmitting,
    handleSubmit,
    t,
    badReviewReason,
    setBadReviewReason,
  }
}
export default useReviewProduct
