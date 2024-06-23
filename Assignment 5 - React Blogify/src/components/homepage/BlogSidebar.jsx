import FavoriteBlogs from './FavoriteBlogs.jsx'
import PopularBlogs from './PopularBlogs.jsx'

const BlogSidebar = () => {
  return (
    <div className='md:col-span-2 h-full w-full space-y-5'>
      <div className='sidebar-card'>
        <PopularBlogs />
      </div>
      <div className='sidebar-card'>
        <FavoriteBlogs />
      </div>
    </div>
  )
}
export default BlogSidebar
