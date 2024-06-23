const WishlistSkeleton = () => {
  return (
    <div className='mx-auto space-y-4 max-w-4xl mt-12'>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className='flex min-w-full mx-auto overflow-hidden min-h-32 bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-800'
        >
          <div className='w-1/5 bg-gray-300 dark:bg-gray-600' />
          <div className='w-2/3 p-4 md:p-4'>
            <p className='w-48 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700' />
            <div className='flex mt-4 item-center gap-x-2'>
              <p className='w-12 h-2 bg-gray-200 rounded-lg dark:bg-gray-700' />
              <p className='w-12 h-2 bg-gray-200 rounded-lg dark:bg-gray-700' />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default WishlistSkeleton
