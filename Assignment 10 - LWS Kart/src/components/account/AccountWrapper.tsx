const AccountWrapper = ({ children }: WrapperChild) => {
  return (
    <div className='container items-start gap-6 pt-4 pb-16 min-h-[40vh] dark:bg-slate-800'>
      {children}
    </div>
  )
}
export default AccountWrapper
