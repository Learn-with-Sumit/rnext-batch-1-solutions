'use client'
import useSidebarFilter from '@/hooks/product-hooks/useSidebarFilter'
import { SIZES } from '@/utils/constants'
import { motion } from 'framer-motion'

const SidebarPriceSize = ({ locale }: { locale: any }) => {
  const {
    minPrice,
    handleSetMinPrice,
    handleSetMaxPrice,
    handleSelectSize,
    selectedSize,
    maxPrice,
  } = useSidebarFilter()

  return (
    <section className='flex items-start'>
      <div className='pt-4'>
        <h3 className='text-xl text-gray-800 mb-3 uppercase font-medium dark:text-white'>
          {locale.price}
        </h3>
        <div className='mt-4 flex flex-col items-center'>
          <motion.input
            type='number'
            name='min'
            id='min'
            value={minPrice}
            onChange={handleSetMinPrice}
            className='w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm'
            placeholder={locale.min}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
            }}
            transition={{ duration: 0.3 }}
          />
          <span className='mx-3 text-gray-500'>-</span>
          <motion.input
            type='number'
            name='max'
            id='max'
            value={maxPrice}
            onChange={handleSetMaxPrice}
            className='w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm'
            placeholder={locale.max}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
      <div className='pt-4'>
        <h3 className='text-xl text-gray-800 mb-3 uppercase font-medium dark:text-white text-end'>
          {locale.size}
        </h3>
        <div className='flex items-center gap-2'>
          {SIZES.map((size) => (
            <motion.div
              className='size-selector'
              key={size}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
              }}
              transition={{ duration: 0.3 }}
            >
              <input
                type='radio'
                name='size'
                id={`size-${size.toLowerCase()}`}
                className='hidden'
                onChange={() => handleSelectSize(size)}
                onClick={() => handleSelectSize(size)}
                checked={selectedSize === size}
              />
              <label
                htmlFor={`size-${size.toLowerCase()}`}
                className={`text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600 dark:text-white ${
                  selectedSize === size ? 'bg-blue-500 text-white' : ''
                }`}
              >
                {size}
              </label>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SidebarPriceSize
