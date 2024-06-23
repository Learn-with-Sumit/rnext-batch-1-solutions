import { FaStar } from 'react-icons/fa'

const getReviewStars = (review: IReviews['reviews'][0]) => {
  return Array.from({ length: review.rating }).map((_, i) => (
    <FaStar key={i} className='text-yellow-500 drop-shadow-lg' />
  ))
}
export default getReviewStars
