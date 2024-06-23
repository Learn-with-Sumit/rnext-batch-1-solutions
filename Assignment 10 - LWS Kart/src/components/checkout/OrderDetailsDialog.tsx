import { PDFDownloadLink } from '@react-pdf/renderer'
import { useRouter } from 'next/navigation'
import { FaDownload } from 'react-icons/fa'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import InvoiceDocument from './InvoicePDF'
import { OrderCard } from './OrderCard'

const OrderDetailsDialog = ({
  showOrderDetails,
  total,
  setShowOrderDetails,
}: IOrderDetails) => {
  const router = useRouter()
  return (
    <Dialog
      open={showOrderDetails.status}
      onOpenChange={() => {
        setShowOrderDetails({ ...showOrderDetails, status: false })
        router.refresh()
      }}
    >
      <DialogContent className='w-fit max-h-[40rem] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='mb-4 flex justify-center gap-8 items-center'>
            <div className='flex flex-col gap-2'>
              <p>Thank you for purchasing</p>
              <p className='text-xs opacity-60'>
                You will receive your products in between 7 business days
              </p>
            </div>
            <PDFDownloadLink
              fileName='LWS-Kart-Invoice'
              document={
                <InvoiceDocument
                  user={showOrderDetails.orderDetails.user}
                  orders={showOrderDetails.orderDetails.orders}
                  total={total}
                />
              }
            >
              <Button
                className='flex justify-between items-center w-fit m-auto gap-4'
                variant={'default'}
              >
                <FaDownload />
                <p>Download Invoice</p>
              </Button>
            </PDFDownloadLink>
          </DialogTitle>
          <DialogDescription className='flex gap-2'>
            <div className='mx-auto p-6 bg-white shadow-md rounded-lg'>
              <h2 className='text-xl font-semibold mb-4'>Your Order Details</h2>
              <div className='mb-4'>
                <label className='block text-gray-700'>First Name:</label>
                <p className='text-blue-500 font-light'>
                  {showOrderDetails.orderDetails.user.firstName}
                </p>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Last Name:</label>
                <p className='font-light text-blue-500'>
                  {showOrderDetails.orderDetails.user.lastName}
                </p>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Country/Region:</label>
                <p className='font-light text-blue-500'>
                  {showOrderDetails.orderDetails.user.region}
                </p>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Street Address:</label>
                <p className='font-light text-blue-500'>
                  {showOrderDetails.orderDetails.user.address}
                </p>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>City:</label>
                <p className='font-light text-blue-500'>
                  {showOrderDetails.orderDetails.user.city}
                </p>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Phone Number:</label>
                <p className='font-light text-blue-500'>
                  {showOrderDetails.orderDetails.user.phone}
                </p>
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700'>Email:</label>
                <p className='font-light text-blue-500'>
                  {showOrderDetails.orderDetails.user.email}
                </p>
              </div>
              <div className='mt-6'>
                <label className='block text-gray-700'>Total Amount:</label>
                <p className='text-gray-900 text-lg font-semibold'>${total}</p>
              </div>
            </div>
            <div className='mx-auto p-6 bg-white shadow-md rounded-lg space-y-2 overflow-y-auto'>
              {showOrderDetails.orderDetails.orders.map(
                (order: IProductWithQuantity) => {
                  return <OrderCard key={order._id} product={order} />
                }
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default OrderDetailsDialog
