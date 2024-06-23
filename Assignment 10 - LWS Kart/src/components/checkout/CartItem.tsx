import Link from 'next/link'
import React from 'react'
import QuantityButton from './QuantityButton'

const CartItem = ({
  product,
  userId,
}: {
  product: IProductWithQuantity
  userId: string
}) => {
  const {
    _id: id,
    product_name: productName,
    size,
    color,
    quantity,
    price,
  } = product

  return (
    <div
      key={id}
      className='flex justify-between shadow-md p-4 gap-2 rounded-lg'
    >
      <div
        style={{
          backgroundColor: color,
        }}
        className={`rounded-full size-2 self-center`}
      ></div>
      <div>
        <Link
          href={`/product-details/${id}`}
          className='font-medium min-w-[224px] text-blue-500 underline underline-offset-4'
        >
          {productName}
        </Link>
        <p className='text-sm text-gray-600'>Size: {size}</p>
        <QuantityButton userId={userId} product={product} />
      </div>
      <p className='text-gray-600 size-fit'>x{quantity}</p>
      <p className='text-teal-500 w-16 font-medium text-sm'>
        ${(price * quantity).toFixed(2)}
      </p>
    </div>
  )
}

export default CartItem
