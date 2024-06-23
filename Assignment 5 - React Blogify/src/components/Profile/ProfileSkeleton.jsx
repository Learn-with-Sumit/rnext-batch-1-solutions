import BlogSkeleton from '../homepage/BlogSkeleton.jsx'

const ProfileSkeleton = () => {
  return (
    <div className='flex flex-col items-center p-8 animate-pulse'>
      <p className='w-32 h-32 bg-gray-200 rounded-full dark:bg-gray-700 ring-4 ring-gray-300 dark:ring-gray-600'></p>
      <h1 className='w-40 h-2 mx-auto mt-6 bg-gray-200 rounded-lg dark:bg-gray-700'></h1>

      <p className='w-56 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>

      <p className='w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
      <p className='w-full h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
      <p className='w-64 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
      <p className='w-4/5 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700 mb-10'></p>
      <div className='w-full space-y-10'>
        {Array.from({ length: 2 }).map((_, index) => (
          <BlogSkeleton key={index} />
        ))}
      </div>
    </div>
  )
}
export default ProfileSkeleton
