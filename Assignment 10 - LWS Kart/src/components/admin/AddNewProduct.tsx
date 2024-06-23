import { useParams } from 'next/navigation'
import React, { forwardRef } from 'react'
import { MdAdd } from 'react-icons/md'
import { Button } from '../ui/button'

const AddNewProduct = forwardRef(({ onClick }: { onClick: () => void }) => {
  const { lang } = useParams()

  return (
    <Button
      onClick={onClick}
      variant={'outline'}
      className='bg-green-500 hover:bg-green-400 text-white rounded-full group shadow-md'
    >
      <MdAdd className='size-6 group-hover:rotate-90 transition-all duration-200' />
      <p>{lang === 'en' ? 'Add new product' : 'নতুন পন্য যোগ করুন'}</p>
    </Button>
  )
})

AddNewProduct.displayName = 'AddNewProduct'

export default AddNewProduct
