'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useAdminProductCategory from '@/hooks/admin-hooks/useAdminProductCategory'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { MdEdit } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { Button } from '../ui/button'

const AdminProductCategory = ({ product }: { product: IProduct }) => {
  const {
    isEditing,
    setSelectedCategory,
    selectedCategory,
    isLocaleBengali,
    handleConfirmChange,
    setIsEditing,
    setShowConfirmButton,
    isLoading,
    category,
    handleCategoryChange,
    showConfirmButton,
  } = useAdminProductCategory(product)

  return (
    <div className='flex gap-2 items-center justify-between'>
      <div className='text-xl flex items-center gap-2'>
        {isEditing ? (
          <div className='relative'>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className='w-full'>
                <SelectValue
                  placeholder={
                    isLocaleBengali
                      ? 'একটি বিভাগ নির্বাচন করুন'
                      : 'Select a category'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    {isLocaleBengali ? 'বিভাগ' : 'Categories'}
                  </SelectLabel>
                  <SelectItem value='Kitchen'>
                    {isLocaleBengali ? 'রান্নাঘর' : 'Kitchen'}
                  </SelectItem>
                  <SelectItem value='Living Room'>
                    {isLocaleBengali ? 'লিভিং রুম' : 'Living Room'}
                  </SelectItem>
                  <SelectItem value='Mattress'>
                    {isLocaleBengali ? 'ম্যাট্রেস' : 'Mattress'}
                  </SelectItem>
                  <SelectItem value='Outdoor'>
                    {isLocaleBengali ? 'বহিরঙ্গন' : 'Outdoor'}
                  </SelectItem>
                  <SelectItem value='Sofa'>
                    {isLocaleBengali ? 'সোফা' : 'Sofa'}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {showConfirmButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='absolute right-0 mt-1'
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
          <p>{category}</p>
        )}
      </div>
      {isEditing ? (
        <Button
          size={'sm'}
          className='size-8 rounded-full'
          variant={'destructive'}
          onClick={() => {
            setIsEditing(false)
            setSelectedCategory(category)
            setShowConfirmButton(false)
          }}
        >
          <RxCross1 />
        </Button>
      ) : (
        <Button
          size={'sm'}
          className='size-8 rounded-full'
          variant='default'
          onClick={() => setIsEditing(true)}
        >
          <MdEdit />
        </Button>
      )}
    </div>
  )
}

export default AdminProductCategory
