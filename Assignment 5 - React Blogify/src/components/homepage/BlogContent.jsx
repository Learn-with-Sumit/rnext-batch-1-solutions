import { useQueryClient } from '@tanstack/react-query'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useReducer, useRef } from 'react'
import {
  INCREMENT_PAGE,
  SET_BLOGS,
  SET_ERROR,
  SET_HAS_MORE,
  SET_LOADING,
} from '../../constants.js'
import { blogReducer, initialState } from '../../reducer/blogReducer.js'
import { getBlogs } from '../../utils/getBlogs.js'
import EmptyResponse from '../common/EmptyResponse.jsx'
import Error from '../common/Error.jsx'
import BlogCard from './BlogCard.jsx'
import BlogSkeleton from './BlogSkeleton.jsx'

const BlogContent = () => {
  const queryClient = useQueryClient()
  const [{ blogs, page, hasMore, loading, error }, dispatch] = useReducer(
    blogReducer,
    initialState
  )
  const loaderRef = useRef(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        dispatch({ type: SET_LOADING, payload: true }) // set loading to true
        const data = await queryClient.fetchQuery({
          queryKey: ['blogs', page],
          queryFn: () => getBlogs(page),
        }) // fetch data
        dispatch({ type: SET_LOADING, payload: false }) // loading false

        // set has more to false when there is no more data
        if (data.data.blogs.length === 0) {
          dispatch({ type: SET_HAS_MORE, payload: false })
        } else {
          dispatch({ type: SET_BLOGS, payload: data.data.blogs })

          dispatch({
            type: INCREMENT_PAGE,
          })
        }
      } catch (error) {
        dispatch({ type: SET_ERROR, payload: error })
      } finally {
        dispatch({ type: SET_LOADING, payload: false })
      }
    }

    // intersection callback
    const onIntersection = (items) => {
      const loaderItem = items[0]
      // fetch more when intersection happens
      if (loaderItem.isIntersecting && hasMore) {
        fetchBlogs()
      }
    }

    // observer
    const observer = new IntersectionObserver(onIntersection)

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current)
    }
    // cleanup
    return () => {
      if (observer) observer.disconnect()
    }
  }, [page, hasMore, queryClient])

  let content = null
  if (loading) {
    content = Array.from({ length: 4 }).map((_, index) => (
      <BlogSkeleton key={index} />
    ))
  }

  if (!loading && error) {
    content = <Error error={error} message='Could not get blogs' />
  }

  if (!loading && !error && blogs.length === 0) {
    content = <EmptyResponse message='No blogs found' />
  }

  if (blogs?.length > 0) {
    content = (
      <AnimatePresence>
        {blogs?.map((blog) => (
          <BlogCard dispatch={dispatch} blog={blog} key={blog.id} />
        ))}
      </AnimatePresence>
    )
  }

  return (
    <div className='space-y-3 md:col-span-5'>
      {content}
      {hasMore ? (
        <div ref={loaderRef}>
          <p>Loading...</p>
        </div>
      ) : (
        <div className='bg-white p-1 text-black rounded-md w-fit'>
          No more blogs
        </div>
      )}
    </div>
  )
}
export default BlogContent
