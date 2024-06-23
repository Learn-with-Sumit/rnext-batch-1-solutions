export const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = { month: 'long', day: 'numeric', year: 'numeric' }
  return date.toLocaleString('en-US', options)
}
