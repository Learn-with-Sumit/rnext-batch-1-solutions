'use client'

import useReviewProduct from '@/hooks/product-hooks/useReviewProduct'
import { Loader2 } from 'lucide-react'
import { MdReviews, MdStar } from 'react-icons/md'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '../ui/dialog'
import { Input } from '../ui/input'
import StarReview from './StarReview'

const ReviewProduct = ({ userId, productId }: IReviewProduct) => {
  const {
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
  } = useReviewProduct({ userId, productId })

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {/* rating */}
          {isLoading ? (
            <Loader2 className='animate-spin' />
          ) : (reviews as IReviews['reviews'])
              ?.filter(
                (review) =>
                  review?.productId === productId && review?.userId === userId
              )
              .findIndex((review) => review.productId === productId) >= 0 ? (
            <div>
              {/* my review */}
              <p
                onClick={handleOpenMyReview}
                className='text-xs italic text-orange-600 underline underline-offset-2 cursor-pointer'
              >
                {t.yourRating}
              </p>
              {/* my rating and star component */}
              {(reviews as IReviews['reviews'])
                ?.filter(
                  (review) =>
                    review?.productId === productId && review?.userId === userId
                )
                .map((review) => (
                  <div key={review.userId} className='flex'>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <MdStar key={i} />
                    ))}
                  </div>
                ))}
            </div>
          ) : (
            <Button className='flex gap-2'>
              <MdReviews />
              {t.reviewThisProduct}
            </Button>
          )}
        </DialogTrigger>
        <DialogOverlay className='fixed inset-0 bg-black opacity-50' />
        <DialogContent className='w-[500px] flex items-center justify-center'>
          <div className='bg-white p-6 rounded max-w-md w-full'>
            <h2 className='text-xl font-bold mb-4'>{t.reviewThisProduct}</h2>
            <StarReview
              rating={rating as number}
              setRating={setRating}
              hover={hover}
              setHover={setHover}
            />
            {rating! <= 2 && (
              <Input
                value={badReviewReason}
                onChange={(e) => setBadReviewReason(e.target.value)}
                placeholder='Reason'
                className='mb-2'
              />
            )}
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className='w-full border p-2 rounded mb-4'
              rows={4}
              placeholder={t.writeYourReview}
            />
            <div className='flex justify-end'>
              <button
                className='bg-gray-300 text-black px-4 py-2 rounded mr-2'
                onClick={() => setIsOpen(false)}
              >
                {t.cancel}
              </button>
              <Button
                disabled={isSubmitting}
                variant={'default'}
                className='bg-blue-500 text-white px-4 py-2 rounded'
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <div className='flex gap-2 items-center justify-center'>
                    <Loader2 className='animate-spin' />
                    <p>{t.submitting}</p>
                  </div>
                ) : (
                  <p>{t.submit}</p>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReviewProduct
