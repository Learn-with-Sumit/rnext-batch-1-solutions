import { getDictionary } from '@/app/[lang]/dictionaries'
import { Key } from 'react'
import DownloadButton from './DownloadButton'
import ReviewProduct from './ReviewProduct'

const OrdersList = async ({
  orders,
  userId,
  lang,
}: {
  orders: any
  userId: string
  lang: ILang['lang']
}) => {
  const {
    accountPage: {
      order_details,
      first_name,
      last_name,
      region,
      address,
      city,
      phone,
      email,
      ordered_items,
      product_name,
      size,
      color,
      price,
      quantity,
      total_cost,
    },
  } = await getDictionary(lang)

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3'>
      {orders.map((order: any) => (
        <div
          key={order._id as Key}
          className='mb-8 shadow-lg rounded-md p-4 animate-fadeUp'
        >
          <div className='flex justify-between mt-2'>
            <h2 className='text-xl font-semibold mb-2'>{order_details}</h2>
            {/* invoice download button */}
            <DownloadButton order={order} />
          </div>
          <div className='flex gap-2 flex-col'>
            <div className='mb-4'>
              <ul className='list-disc pl-4'>
                <li>
                  <strong>{first_name}:</strong> {order.userDetails.firstName}
                </li>
                <li>
                  <strong>{last_name}:</strong> {order.userDetails.lastName}
                </li>
                <li>
                  <strong>{region}:</strong> {order.userDetails.region}
                </li>
                <li>
                  <strong>{address}:</strong> {order.userDetails.address}
                </li>
                <li>
                  <strong>{city}:</strong> {order.userDetails.city}
                </li>
                <li>
                  <strong>{phone}:</strong> {order.userDetails.phone}
                </li>
                <li>
                  <strong>{email}:</strong> {order.userDetails.email}
                </li>
              </ul>
            </div>
            <div className='h-60 max-h-80 overflow-y-auto'>
              <h3 className='text-lg font-semibold mb-2'>{ordered_items}</h3>
              {order.items.map((item: IProductWithQuantity) => (
                <div key={item._id} className='flex justify-between'>
                  <div className='border-b py-4 max-w-[284px]'>
                    <p>
                      <strong>{product_name}:</strong> {item.product_name}
                    </p>
                    <p>
                      <strong>{size}:</strong> {item.size}
                    </p>
                    <p>
                      <strong>{color}:</strong> {item.color}
                    </p>
                    <p>
                      <strong>{price}:</strong> $
                      {(item.discount_price * item.quantity).toFixed(2)}
                    </p>
                    <p>
                      <strong>{quantity}:</strong> {item.quantity}
                    </p>
                  </div>
                  {/* in real world we can only review the product after it has been delivered, but as an assignment, let's make it a feature where we can review and rate a ordered item, just to create an extra feature for the assignment */}
                  <ReviewProduct productId={item._id} userId={userId} />
                </div>
              ))}
            </div>
          </div>
          <div className='mt-4 flex justify-between'>
            <h3 className='text-lg font-semibold'>{total_cost}</h3>
            <p className='text-lg font-bold'>${order.cost.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
export default OrdersList
