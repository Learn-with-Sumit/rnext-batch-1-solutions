'use client'
import { deleteReviewFromProduct } from '@/app/actions/admin.actions'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import getAvgReviewStars from '@/utils/getAvgReviewStars'
import getInitialReviewTab from '@/utils/getInitialReviewTab'
import getReviewStars from '@/utils/getReviewStars'
import { Loader2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { RxAvatar } from 'react-icons/rx'
import { toast } from 'react-toastify'
import BarPollReview from '../ui/bar-poll'
import { Button } from '../ui/button'
import ChipTabs from '../ui/chip-tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

const ReviewsButton = ({ productReviews, role, productId }: IReviewsButton) => {
  const { lang } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<string | null>(null)
  const isLocaleBengali = lang === 'bn'
  const [isDeleting, setIsDeleting] = useState(false)

  const initialTab = getInitialReviewTab(productReviews)

  const [currentReviewTab, setCurrentReviewTab] = useState(initialTab)

  // delete the review
  const handleDeleteReview = async () => {
    if (selectedReview) {
      try {
        if (role === 'admin') {
          setIsDeleting(true)
          const data = await deleteReviewFromProduct(selectedReview, productId!)
          setIsDeleting(false)
          toast.success(data?.msg, { autoClose: 1500 })
          setOpen(false)
          setConfirmOpen(false)
          router.refresh()
        } else {
          return null
        }
      } catch (error) {
        toast.error('An error occurred', { autoClose: 1500 })
        setIsDeleting(false)
      }
    }
  }

  // get the reviews of the specific star tab
  const filterReviewsByCurrentReviewTab = (reviews: typeof productReviews) =>
    reviews.filter((review) => review.rating === currentReviewTab)

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger asChild>
              <div>
                <p className='text-xs text-blue-500 underline underline-offset-2 flex gap-2 items-center'>
                  {getAvgReviewStars(productReviews as IReviews['reviews'])}(
                  {productReviews?.length ?? 0}{' '}
                  {isLocaleBengali
                    ? productReviews?.length <= 1
                      ? 'রিভিউ'
                      : 'রিভিউসমূহ'
                    : productReviews?.length > 1
                    ? 'Reviews'
                    : 'Review'}
                  )
                </p>
                <TooltipContent className='bg-white rounded-md shadow-md p-2'>
                  {isLocaleBengali ? 'রিভিউ দেখুন' : 'See Reviews'}
                </TooltipContent>
              </div>
            </DialogTrigger>
            <DialogContent className='max-w-[40rem] bg-blue-500 max-h-[30rem] overflow-y-auto'>
              {/* shows how many review appeared how many times */}
              <BarPollReview productReviews={productReviews} />
              <p className='text-white font-bold'>
                {isLocaleBengali ? 'ইউজার রিভিউসমূহ' : 'User Reviews'} (
                {productReviews.length})
              </p>
              {productReviews.length > 0 && (
                <ChipTabs
                  setCurrentReviewTab={setCurrentReviewTab}
                  currentReviewTab={currentReviewTab}
                />
              )}

              {productReviews.length > 0 ? (
                filterReviewsByCurrentReviewTab(productReviews).length === 0 ? (
                  <p className='text-white font-semibold font-italic'>
                    No Review for {currentReviewTab}{' '}
                    {currentReviewTab === 1 ? 'Star' : 'Stars'}
                  </p>
                ) : (
                  filterReviewsByCurrentReviewTab(productReviews).map(
                    (review) => {
                      return (
                        <div
                          key={review._id}
                          className='shadow-md rounded-lg p-2 bg-white border-l-4 border-l-lime-400'
                        >
                          <div className='flex gap-2 items-center'>
                            <RxAvatar />
                            {review.username}
                          </div>
                          <div className='flex gap-2'>
                            <p className='text-blue-500 italic'>
                              {isLocaleBengali ? 'পর্যালোচনা' : 'Review'}:{' '}
                            </p>
                            {review.review}
                          </div>
                          <div className='flex gap-2 items-center justify-between'>
                            <div>
                              <div className='flex gap-1 items-center'>
                                <p className='text-blue-500 italic'>
                                  {isLocaleBengali ? 'রেটিং' : 'Rating'}:{' '}
                                </p>
                                {review.rating && getReviewStars(review)}
                              </div>
                              {review?.badReasonReview && (
                                <div className='flex gap-1 items-center'>
                                  <p className='text-blue-500 italic'>
                                    {isLocaleBengali
                                      ? 'খারাপ রেটিং এর কারণ'
                                      : 'Bad Review Reason'}
                                    :{' '}
                                  </p>
                                  {review?.badReasonReview &&
                                    review?.badReasonReview}
                                </div>
                              )}
                            </div>
                            {/* admin can delete a review */}
                            {role === 'admin' ? (
                              <Dialog
                                open={confirmOpen}
                                onOpenChange={setConfirmOpen}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    onClick={() => {
                                      setSelectedReview(review._id as string)
                                      setConfirmOpen(true)
                                    }}
                                    disabled={isDeleting}
                                    variant={'destructive'}
                                  >
                                    {isDeleting &&
                                    selectedReview === review._id ? (
                                      <Loader2 className='animate-spin' />
                                    ) : (
                                      <MdDelete />
                                    )}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className='max-w-sm'>
                                  <div className='text-center'>
                                    <p className='font-bold'>
                                      {isLocaleBengali
                                        ? 'আপনি কি নিশ্চিত?'
                                        : 'Are you sure?'}
                                    </p>
                                    <p>
                                      {isLocaleBengali
                                        ? 'আপনি এই রিভিউ মুছে ফেলতে চান?'
                                        : 'Do you want to delete this review?'}
                                    </p>
                                    <div className='flex justify-center gap-4 mt-4'>
                                      <Button
                                        onClick={handleDeleteReview}
                                        disabled={isDeleting}
                                        variant={'destructive'}
                                      >
                                        {isDeleting ? (
                                          <Loader2 className='animate-spin' />
                                        ) : isLocaleBengali ? (
                                          'মুছুন'
                                        ) : (
                                          'Delete'
                                        )}
                                      </Button>
                                      <Button
                                        onClick={() => setConfirmOpen(false)}
                                        variant={'outline'}
                                      >
                                        {isLocaleBengali
                                          ? 'বাতিল করুন'
                                          : 'Cancel'}
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            ) : null}
                          </div>
                        </div>
                      )
                    }
                  )
                )
              ) : (
                <p className='text-white'>
                  {isLocaleBengali ? 'কোন রিভিউ নেই' : 'No Reviews'}
                </p>
              )}
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  )
}
export default ReviewsButton
