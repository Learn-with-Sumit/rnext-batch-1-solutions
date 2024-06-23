import { manageProduct } from '@/app/actions/admin.actions'
import { PRODUCT_STOCK } from '@/utils/constants'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const useAdminProductStock = (product: IProduct) => {
  const { stock_count, _id } = product
  const [stockCount, setStockCount] = useState(stock_count.toString())
  const [isUpdatingStock, setIsUpdatingStock] = useState('')
  const router = useRouter()
  const { lang } = useParams()
  const isLocaleBengali = lang === 'bn'

  const incrementStock = () => {
    setStockCount((prev) => (parseInt(prev, 10) + 1).toString())
  }

  const decrementStock = () => {
    setStockCount((prev) => Math.max(parseInt(prev, 10) - 1, 0).toString())
  }

  const handleNewStock = async () => {
    try {
      setIsUpdatingStock(_id)

      const newStockCount = parseInt(stockCount, 10)
      const data = await manageProduct(_id, PRODUCT_STOCK, newStockCount)
      if (data?.msg) {
        toast.error(data?.msg)
      }

      toast.success(
        `${product.product_name}'s new stock count is now ${newStockCount}`,
        { autoClose: 1500 }
      )

      setIsUpdatingStock('')
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
      setIsUpdatingStock('')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || !isNaN(parseInt(value, 10))) {
      setStockCount(value)
    }
  }

  return {
    isLocaleBengali,
    incrementStock,
    decrementStock,
    handleInputChange,
    stockCount,
    isUpdatingStock,
    handleNewStock,
    stock_count,
  }
}
export default useAdminProductStock
