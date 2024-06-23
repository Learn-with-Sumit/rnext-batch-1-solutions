'use client'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import useAdminProductDelete from '@/hooks/admin-hooks/useAdminProductDelete'
import { Loader2 } from 'lucide-react'
import { BsExclamation, BsQuestion } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'

const ProductDelete = ({ product }: { product: IProduct }) => {
  const {
    setIsDeleteOpen,
    isDeleteOpen,
    isLocaleBengali,
    deleteProduct,
    isDeleting,
  } = useAdminProductDelete(product)

  return (
    <CardFooter className='flex justify-between m-auto'>
      <Dialog
        onOpenChange={() => setIsDeleteOpen(!isDeleteOpen)}
        open={isDeleteOpen}
      >
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsDeleteOpen(true)}
            className='space-x-2'
            variant='destructive'
          >
            <MdDelete />
            <span>{isLocaleBengali ? 'মুছে ফেলুন' : 'Delete'}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[505px]'>
          <DialogHeader>
            <DialogTitle className='text-lg flex gap-2 items-center'>
              <BsQuestion className='text-white bg-black rounded-full' />
              <span>
                {isLocaleBengali
                  ? 'আপনি কি নিশ্চিত যে আপনি এই পণ্যটি মুছে ফেলতে চান?'
                  : 'Are you sure you want to delete this product?'}
              </span>
            </DialogTitle>
            <DialogDescription className='text-md text-sm flex gap-2 items-center'>
              <BsExclamation className='text-white bg-black rounded-full' />
              <span>
                {isLocaleBengali
                  ? 'এই ক্রিয়াটি অপরিবর্তনীয়'
                  : 'This action is irreversible'}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'></div>
          <DialogFooter>
            <Button
              disabled={isDeleting}
              onClick={deleteProduct}
              className='bg-green-500 hover:bg-green-400'
              variant='default'
            >
              {isDeleting ? (
                <Loader2 className='animate-spin' />
              ) : (
                <p>{isLocaleBengali ? 'নিশ্চিত করুন' : 'Confirm'}</p>
              )}
            </Button>
            <Button
              onClick={() => setIsDeleteOpen(false)}
              variant='destructive'
            >
              {isLocaleBengali ? 'বাতিল করুন' : 'Cancel'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardFooter>
  )
}
export default ProductDelete
