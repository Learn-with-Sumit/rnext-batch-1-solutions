import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import CommentSection from '../components/SingleBlog/CommentSection.jsx'
import FloatingMenu from '../components/SingleBlog/FloatingMenu.jsx'
import TopDetails from '../components/SingleBlog/TopDetails.jsx'
import EmptyResponse from '../components/common/EmptyResponse.jsx'
import Error from '../components/common/Error.jsx'
import Loader from '../components/misc/Loader.jsx'
import useGetSingleBlog from '../hooks/api/useGetSingleBlog.js'

const SingleBlog = () => {
  const { id } = useParams() // getting the param id from the url
  const commentBoxRef = useRef(null)
  const { data, isError, isLoading, error } = useGetSingleBlog(id) // querying the blog detail
  let content = null

  if (isLoading && !isError) {
    content = (
      <div className='h-screen flex justify-center items-center'>
        <Loader />
      </div>
    )
  }

  if (!isLoading && isError) {
    content = (
      <div className='h-screen flex justify-center items-center'>
        <Error error={error} message='Could not get blog' />
      </div>
    )
  }

  if (!isLoading && !isError && !data.data) {
    content = <EmptyResponse message='Blog not available' />
  }

  if (!isLoading && !isError && data.data) {
    content = (
      <>
        <main>
          <TopDetails blog={data} />
          <CommentSection ref={commentBoxRef} blog={data} />
        </main>
        <FloatingMenu
          ref={commentBoxRef}
          likes={data.data.likes}
          blog={data.data}
        />
      </>
    )
  }

  return content
}
export default SingleBlog
