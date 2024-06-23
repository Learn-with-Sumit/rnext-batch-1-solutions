'use client'
import { manageProduct } from '@/app/actions/admin.actions'
import { PRODUCT_NAME } from '@/utils/constants'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import { CardTitle } from '../ui/card'
import { Input } from '../ui/input'

const ProductName = ({
  index,
  product,
}: {
  index: number
  product: IProduct
}) => {
  const { product_name } = product
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(product_name)
  const [showConfirmButton, setShowConfirmButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setShowConfirmButton(e.target.value !== product_name)
  }

  const handleConfirmChange = async () => {
    try {
      if (!!inputValue) {
        setIsLoading(true)

        const data = await manageProduct(product._id, PRODUCT_NAME, inputValue)

        if (data?.msg) {
          toast.error(data?.msg)
        }

        setIsEditing(false)
        setShowConfirmButton(false)
        toast.success('Product name changed successfully')
        router.refresh()
      } else {
        toast.error('Product must have a name', { autoClose: 1500 })
        setInputValue(product_name)
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsEditing(false)
      setShowConfirmButton(false)
      setIsLoading(false)
    }
  }

  return (
    <div className='flex gap-2 items-center justify-between'>
      <CardTitle className='text-xl flex items-center gap-2'>
        <p>{index + 1}.</p>
        {isEditing ? (
          <div className='relative'>
            <Input
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmChange()}
              type='text'
              defaultValue={product_name}
              value={inputValue}
              onChange={handleInputChange}
            />
            {showConfirmButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='absolute right-0 mt-1 z-10'
              >
                <Button
                  onClick={handleConfirmChange}
                  className='bg-green-500 text-white'
                >
                  {isLoading ? (
                    <Loader2 className='animate-spin' />
                  ) : (
                    <p>Confirm</p>
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        ) : (
          <p>{product_name}</p>
        )}
      </CardTitle>
      {isEditing ? (
        <Button
          variant={'destructive'}
          onClick={() => {
            setIsEditing(false)
            setInputValue(product_name)
            setShowConfirmButton(false)
          }}
        >
          <RxCross1 />
        </Button>
      ) : (
        <Button variant='default' onClick={() => setIsEditing(true)}>
          <MdEdit />
        </Button>
      )}
    </div>
  )
}

export default ProductName
