import { useParams } from 'react-router-dom'
import ProfileInfo from '../components/Profile/ProfileInfo.jsx'
import ProfileSkeleton from '../components/Profile/ProfileSkeleton.jsx'
import EmptyResponse from '../components/common/EmptyResponse.jsx'
import Error from '../components/common/Error.jsx'
import BlogCard from '../components/homepage/BlogCard.jsx'
import useGetUser from '../hooks/api/useGetUser.js'
import { generateFullName } from '../utils/generateFullName.js'

const Profile = () => {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useGetUser(id)
  let content = null

  if (isLoading && !isError) {
    content = (
      <div className='h-screen mx-auto max-w-[1020px]'>
        <ProfileSkeleton />
      </div>
    )
  }

  if (!isLoading && isError) {
    content = (
      <div className='h-screen flex justify-center items-center'>
        <Error error={error} message='Could not get profile details' />
      </div>
    )
  }

  if (!isLoading && !isError && !data.data.id) {
    content = <EmptyResponse message='No profile data' />
  }

  if (!isLoading && !isError && data.data.id) {
    content = (
      <main className='mx-auto max-w-[1020px] py-8'>
        <div className='container'>
          <ProfileInfo profile={data.data} />
          {/* end profile info */}
          <h4 className='mt-6 text-xl lg:mt-8 lg:text-2xl'>
            {generateFullName(data.data.firstName, data.data.lastName)}&apos;s
            Blogs
          </h4>
          <div className='my-6 space-y-4'>
            {/* if user has blogs, show them here */}
            {data.data.blogs.length > 0 ? (
              data.data.blogs.map((blog) => (
                <BlogCard blog={blog} key={blog.id} />
              ))
            ) : (
              <p className='h-32'>User have no blogs</p>
            )}
          </div>
        </div>
      </main>
    )
  }

  return content
}
export default Profile
