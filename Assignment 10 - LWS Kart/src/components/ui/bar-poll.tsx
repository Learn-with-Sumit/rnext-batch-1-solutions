import { getColorForTitle, getOccurrence } from '@/utils/barPollUtil'
import { motion } from 'framer-motion'
import { MdStar } from 'react-icons/md'

const titles = [5, 4, 3, 2, 1]

type ReviewType = {
  title: number
  reviews: number
  color: string
}

type ProductReviewType = {
  rating: number
}

type BarPollReviewProps = {
  productReviews: ProductReviewType[]
}

const BarPollReview = ({ productReviews }: BarPollReviewProps) => {
  const reviews: ReviewType[] = titles.map((title) => {
    return {
      title,
      reviews: getOccurrence(
        productReviews.map((rev) => rev.rating),
        title
      ),
      color: getColorForTitle(title),
    }
  })

  return (
    <section className='bg-slate-900 px-4 py-6 flex justify-center flex-col'>
      <p className='text-center text-white'>Reviews</p>
      <div className='m-auto flex gap-6 md:gap-12'>
        <Bars reviews={reviews} />
      </div>
    </section>
  )
}

const Bars = ({ reviews }: { reviews: ReviewType[] }) => {
  const totalReviews = reviews.reduce((acc, cv) => acc + cv.reviews, 0)

  return (
    <div className='flex justify-between gap-24'>
      <div className='flex flex-col justify-center mr-4 text-white'>
        {reviews.map((review) => (
          <div
            key={review.title}
            className='flex items-center mb-2 justify-between gap-2'
          >
            <div className='mr-2 flex gap-2'>
              <p className='bg-yellow-500 rounded-full w-6 flex justify-center items-center text-sm h-6'>
                {review.title}
              </p>{' '}
              <span>{review.title === 1 ? ' star' : ' stars'}:</span>
            </div>
            <span>{review.reviews}</span>
          </div>
        ))}
      </div>
      <div
        className='col-span-1 grid min-h-[200px] gap-6'
        style={{
          gridTemplateColumns: `repeat(${reviews.length}, minmax(0, 1fr))`,
        }}
      >
        {reviews.map((review) => {
          const height = review.reviews
            ? ((review.reviews / totalReviews) * 100).toFixed(2)
            : 0
          return (
            <div key={review.title} className='col-span-1'>
              <div className='relative flex h-full w-4 items-end overflow-hidden rounded-2xl bg-gradient-to-b from-slate-700 to-slate-800'>
                <motion.span
                  animate={{ height: `${height}%` }}
                  className={`relative z-0 w-full ${review.color}`}
                  transition={{ type: 'spring' }}
                />
                <span className='absolute bottom-0 left-[50%] mt-2 inline-block w-full -translate-x-[50%] p-2 text-center text-sm text-slate-50'>
                  <b className='relative right-1'>{review.title}</b>
                </span>
              </div>
              <MdStar className='text-yellow-500' />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BarPollReview
