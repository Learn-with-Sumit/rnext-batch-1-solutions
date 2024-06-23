const WishlistWrapper = ({ children }: WrapperChild) => {
  return (
    <div className='container gap-6 pt-4 pb-16 min-h-[40vh] dark:bg-slate-800 dark:*:text-white '>
      {children}
    </div>
  )
}
export default WishlistWrapper
