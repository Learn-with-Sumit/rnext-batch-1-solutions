'use client'

import useSidebarFilter from '@/hooks/product-hooks/useSidebarFilter'
import { motion } from 'framer-motion'

const SidebarCategories = ({
  categories,
  localeCategories,
}: {
  categories: ICategory[]
  localeCategories: any
}) => {
  const { handleChangeCategory, selectedCategories } = useSidebarFilter()

  return (
    <div className='space-y-2 dark:text-white'>
      {categories.map((category) => {
        const categoryNames = Object.keys(category)

        return categoryNames.map((categoryName) => (
          <motion.div
            key={categoryName}
            className='flex items-center dark:text-white cursor-pointer p-2'
            whileHover={{
              scale: 1.05,
              borderColor: '#3b82f6',
              boxShadow: '0 0 10px #3b82f6',
            }}
            transition={{ duration: 0.3 }}
            onClick={() => handleChangeCategory(categoryName)}
          >
            <input
              type='checkbox'
              name={`cat-${categoryName}`}
              value={categoryName}
              id={`cat-${categoryName}`}
              className='text-primary focus:ring-0 rounded-sm cursor-pointer'
              checked={selectedCategories.includes(categoryName)}
              onChange={() => handleChangeCategory(categoryName)}
            />
            <label
              htmlFor={`cat-${categoryName}`}
              className='text-gray-600 dark:text-white ml-3 cursor-pointer'
              onClick={(e) => e.stopPropagation()}
            >
              {localeCategories[categoryName] as string}
            </label>
            <div className='ml-auto text-gray-600 text-sm dark:text-white'>
              ({category[categoryName]})
            </div>
          </motion.div>
        ))
      })}
    </div>
  )
}

export default SidebarCategories
