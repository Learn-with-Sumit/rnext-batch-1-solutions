import ReactQueryProvider from '@/providers/QueryProvider'

const ShopWrapper = ({ children }: WrapperChild) => {
  return (
    <div className='container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start'>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </div>
  )
}
export default ShopWrapper
