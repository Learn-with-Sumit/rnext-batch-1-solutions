import { manageProduct } from '@/app/actions/admin.actions'
import { PRODUCT_CATEGORY } from '@/utils/constants'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

const useAdminProductCategory = (product: IProduct) => {
  const { category, _id } = product
  const [isEditing, setIsEditing] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(category)
  const [showConfirmButton, setShowConfirmButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { lang } = useParams()
  const isLocaleBengali = lang === 'bn'

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory)
    setShowConfirmButton(newCategory !== category)
  }

  const handleConfirmChange = async () => {
    try {
      if (selectedCategory) {
        setIsLoading(true)

        const data = await manageProduct(
          _id,
          PRODUCT_CATEGORY,
          selectedCategory
        )

        if (data?.msg) {
          toast.error(data?.msg)
        }

        setIsEditing(false)
        setShowConfirmButton(false)
        toast.success(`Product category changed to ${selectedCategory}`)
        router.refresh()
      } else {
        toast.error('Product must have a category', { autoClose: 1500 })
        setSelectedCategory(category)
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsEditing(false)
      setShowConfirmButton(false)
      setIsLoading(false)
    }
  }

  return {
    isEditing,
    setSelectedCategory,
    selectedCategory,
    isLocaleBengali,
    handleConfirmChange,
    setIsEditing,
    setShowConfirmButton,
    handleCategoryChange,
    isLoading,
    category,
    showConfirmButton,
  }
}
export default useAdminProductCategory
