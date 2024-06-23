const ProductWrapper = ({ children }: WrapperChild) => {
  return (
    <div className='col-span-3'>
      <div className='grid md:grid-cols-3 grid-cols-1 gap-6'>{children}</div>
    </div>
  )
}
export default ProductWrapper
