import { useContext } from 'react'
import { NewsContext } from '../../context/index.js'
import Loader from './Loader.jsx'
import Error from './Error.jsx'
import EmptyResponse from './EmptyResponse.jsx'

const NewsContainer = ({ children }) => {
  const { newsData, loading, error, searchValue } = useContext(NewsContext)

  const data = !searchValue ? newsData?.data?.articles : newsData?.data?.result
  let content = null

  if (loading && !error) {
    content = <Loader />
  }

  if (!loading && error) {
    content = <Error />
  }

  if (!loading && !error && data?.length === 0) {
    content = <EmptyResponse />
  }

  if (!loading && !error && data?.length > 0) {
    content = (
      <div className='container mx-auto grid grid-cols-12 gap-8'>
        {children}
      </div>
    )
  }

  return <main className='my-10 lg:my-14'>{content}</main>
}
export default NewsContainer
