'use client'
import useAdminProductStock from '@/hooks/admin-hooks/useAdminProductStock'
import { motion } from 'framer-motion'
import { ChevronDownIcon, ChevronUpIcon, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const ProductStockAdmin = ({ product }: { product: IProduct }) => {
  const {
    isLocaleBengali,
    incrementStock,
    decrementStock,
    handleInputChange,
    stockCount,
    isUpdatingStock,
    handleNewStock,
    stock_count,
  } = useAdminProductStock(product)

  return (
    <div className='flex flex-col items-center'>
      <div className='flex items-center gap-2'>
        <p className='text-xs'>{isLocaleBengali ? 'স্টক' : 'Stock'}</p>
        <motion.button
          type='button'
          onClick={incrementStock}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='p-1 bg-blue-500 text-white rounded-full'
        >
          <ChevronUpIcon className='w-5 h-5' />
        </motion.button>
        <Input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleNewStock()
            }
          }} // page was refreshing when pressing enter
          type='text'
          value={stockCount}
          onChange={handleInputChange}
          className='stock-count w-16 px-2 py-1 bg-gray-200 text-lg font-bold text-center'
        />
        <motion.button
          type='button'
          onClick={decrementStock}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className='p-1 bg-blue-500 text-white rounded-full'
        >
          <ChevronDownIcon className='w-5 h-5' />
        </motion.button>
      </div>
      <Button
        type='button'
        onClick={handleNewStock}
        disabled={stockCount === stock_count.toString() || !!isUpdatingStock}
        className='mt-2 bg-green-500'
      >
        {isUpdatingStock === product._id ? (
          <Loader2 className='animate-spin' />
        ) : (
          <p>{isLocaleBengali ? 'নিশ্চিত করুন' : 'Confirm'}</p>
        )}
      </Button>
    </div>
  )
}

export default ProductStockAdmin
