const NewsLetter = () => {
  return (
    <div className='col-span-12 mt-10 flex items-start gap-4 xl:col-span-5 xl:mt-0'>
      <div className='flex-1'>
        <h3 className='text-2xl font-semibold'>
          Subscribe and be informed first hand about the actual economic news.
        </h3>
        <p className='mt-2 text-sm leading-6'>
          All the day's headlines and highlights, direct to you every morning..
        </p>
      </div>
      {/* subscribe */}
      <button className='rounded-full bg-[#00D991] px-7 py-2.5 text-xs font-medium text-[#F1EFEA] hover:opacity-80 lg:text-base'>
        Subscribe
      </button>
    </div>
  )
}
export default NewsLetter
