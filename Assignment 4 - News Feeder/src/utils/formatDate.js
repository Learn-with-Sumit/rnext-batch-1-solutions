export const formatDate = (publishedAt) => {
  const date = new Date(publishedAt)
  const options = { day: '2-digit', month: 'short', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)
  return formattedDate
}
