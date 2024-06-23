import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useState } from 'react'

import { createNewProduct } from '@/app/actions/admin.actions'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'

const formSchema = z.object({
  product_name: z.string().min(1, { message: 'Product name is required.' }),
  stock_count: z
    .number()
    .nonnegative({ message: 'Stock count cannot be negative.' }),
  brand: z.string().min(1, { message: 'Brand is required.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
  SKU: z.string().min(1, { message: 'SKU is required.' }),
  price: z.number().positive({ message: 'Price must be positive.' }),
  discountPercentage: z
    .number()
    .max(50, { message: 'Discount percentage maximum can be 50 percent' })
    .optional(),
  description: z.string().min(1, { message: 'Description is required.' }),
  new_arrival: z.boolean().optional().default(false),
  trending: z.boolean().optional().default(false),
  size: z.string().min(1, { message: 'Size is required.' }),
  color: z.string().min(1, { message: 'Color is required.' }),
  image: z.string().min(1, { message: 'Image is required' }),
})

const useAdminProductForm = () => {
  const [open, setOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  const isLocaleBengali = useParams().lang === 'bn'

  const {
    register,
    setValue,
    watch,
    formState: { isSubmitting },
  } = form

  const hasImage = watch('image')

  const onSubmit = async (data: any) => {
    try {
      const newProduct = {
        ...data,
        discount_price:
          data.price - data.price * (data.discountPercentage / 100),
      }

      await createNewProduct(newProduct)
      setOpen(false)
      toast.success(
        isLocaleBengali
          ? `নতুন পণ্য ${data.product_name} যোগ করা হয়েছে`
          : `Added new product ${data.product_name}`,
        {
          autoClose: 1500,
        }
      )
    } catch (error) {
      toast.error(
        isLocaleBengali ? 'পণ্য যোগ করতে ব্যর্থ হয়েছে' : 'Product add failed',
        { autoClose: 1500 }
      )
    }
  }
  return {
    setOpen,
    isLocaleBengali,
    onSubmit,
    form,
    register,
    setValue,
    isSubmitting,
    open,
    hasImage,
  }
}
export default useAdminProductForm
