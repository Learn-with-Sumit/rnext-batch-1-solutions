import { deleteProductById } from '@/app/actions/admin.actions'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

const useAdminProductDelete = (product: IProduct) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const { lang } = useParams()
  const isLocaleBengali = lang === 'bn'

  const deleteProduct = async () => {
    try {
      setIsDeleting(true)
      await deleteProductById(product._id)
      setIsDeleteOpen(false)
      toast.success(
        isLocaleBengali
          ? `সফলভাবে ${product.product_name} মুছে ফেলা হয়েছে`
          : `Deleted ${product.product_name} successfully`,
        {
          autoClose: 1500,
        }
      )
      router.refresh()
    } catch (error) {
      toast.error(isLocaleBengali ? 'মোছা ব্যর্থ হয়েছে' : 'Delete failed')
      return null
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    setIsDeleteOpen,
    isDeleteOpen,
    isLocaleBengali,
    deleteProduct,
    isDeleting,
  }
}
export default useAdminProductDelete
