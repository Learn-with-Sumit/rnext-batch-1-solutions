const getInitialReviewTab = (productReviews: IReviews['reviews']) => {
  // find the maximum rating
  const maxRating = productReviews.reduce(
    (max, review) => (review.rating > max ? review.rating : max),
    0
  )

  // convert max rating to index in tabs array
  const initialTab = maxRating >= 1 && maxRating <= 5 ? maxRating : 0
  return initialTab
}
export default getInitialReviewTab
