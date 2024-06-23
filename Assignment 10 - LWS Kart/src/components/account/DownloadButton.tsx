'use client'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MdDownload } from 'react-icons/md'
import InvoiceDocument from '../checkout/InvoicePDF'
import { Button } from '../ui/button'

const DownloadButton = ({ order }: any) => {
  const [isClient, setIsClient] = useState(false)

  // this was needed to prevent bug of react pdf 😑, which ensures component renders only on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? (
    <PDFDownloadLink
      fileName={`kart-invoice-${order.userDetails.firstName} ${order.userDetails.lastName}`}
      document={
        <InvoiceDocument
          user={order.userDetails}
          orders={order.items}
          total={order.cost}
        />
      }
    >
      <Button variant={'default'} className='flex gap-2'>
        <MdDownload />
        <p>Invoice</p>
      </Button>
    </PDFDownloadLink>
  ) : (
    <Loader2 className='animate-spin' />
  )
}
export default DownloadButton
