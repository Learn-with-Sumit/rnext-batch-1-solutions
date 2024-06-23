'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import useSidebarFilter from '@/hooks/product-hooks/useSidebarFilter'
import { motion } from 'framer-motion'

const SidebarStockStatus = ({ locale }: { locale: any }) => {
  const { handleSetStockStatus, stockStatus } = useSidebarFilter()

  const { in_stock, outOfStock, stock_status } = locale

  return (
    <div>
      <h3 className='mb-2'>{stock_status}</h3>
      <RadioGroup
        value={stockStatus ? 'inStock' : 'outOfStock'}
        onValueChange={handleSetStockStatus}
      >
        <motion.div
          className='flex items-center space-x-2 p-2 cursor-pointer'
          whileHover={{
            scale: 1.05,
            borderColor: '#3b82f6',
            boxShadow: '0 0 10px #3b82f6',
          }}
          transition={{ duration: 0.3 }}
        >
          <RadioGroupItem
            className='cursor-pointer'
            value='inStock'
            id='inStock'
          />
          <Label className='cursor-pointer' htmlFor='inStock'>
            {in_stock}
          </Label>
        </motion.div>
        <motion.div
          className='flex items-center space-x-2 p-2 cursor-pointer'
          whileHover={{
            scale: 1.05,
            borderColor: '#3b82f6',
            boxShadow: '0 0 10px #3b82f6',
          }}
          transition={{ duration: 0.3 }}
        >
          <RadioGroupItem
            className='cursor-pointer'
            value='outOfStock'
            id='outOfStock'
          />
          <Label className='cursor-pointer' htmlFor='outOfStock'>
            {outOfStock}
          </Label>
        </motion.div>
      </RadioGroup>
    </div>
  )
}

export default SidebarStockStatus
