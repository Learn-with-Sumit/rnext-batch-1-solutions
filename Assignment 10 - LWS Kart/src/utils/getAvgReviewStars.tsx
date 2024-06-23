import { FaStar } from 'react-icons/fa'

const getAvgReviewStars = (reviews: any[]) => {
  return reviews.length > 0
    ? Array.from({
        length: Math.floor(
          reviews?.reduce((acc, curr) => acc + curr.rating, 0)! / reviews.length
        ),
      }).map((_, i) => (
        <span key={i}>
          <FaStar className='text-yellow-500 drop-shadow-lg' />
        </span>
      ))
    : null
}
export default getAvgReviewStars
